param(
    [switch]$SkipBuild,
    [switch]$KeepRemoteFiles,
    [switch]$ValidateOnly
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$bucket = if ($env:ARVAN_BUCKET) { $env:ARVAN_BUCKET } else { 'atra-site' }
$endpoint = if ($env:ARVAN_S3_ENDPOINT) { $env:ARVAN_S3_ENDPOINT } else { 'https://s3.ir-thr-at1.arvanstorage.ir' }
$dist = Join-Path $projectRoot 'web/dist'
$contentOut = Join-Path $projectRoot 'web/public/content'

function Assert-Command {
    param([string]$Name, [string]$InstallHint)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "'$Name' is not installed. $InstallHint"
    }
}

function Set-ArvanCredentials {
    if (-not $env:AWS_ACCESS_KEY_ID) {
        $env:AWS_ACCESS_KEY_ID = Read-Host 'Arvan Access Key'
    }

    if (-not $env:AWS_SECRET_ACCESS_KEY) {
        $secureSecret = Read-Host 'Arvan Secret Key' -AsSecureString
        $secretPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureSecret)
        try {
            $env:AWS_SECRET_ACCESS_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($secretPointer)
        } finally {
            [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($secretPointer)
        }
    }

    $env:AWS_DEFAULT_REGION = 'us-east-1'
}

Push-Location $projectRoot
try {
    Assert-Command -Name 'node' -InstallHint 'Install Node.js 22 or newer before internet access is unavailable.'
    Assert-Command -Name 'npm' -InstallHint 'npm is included with Node.js.'

    if (-not $SkipBuild) {
        Assert-Command -Name 'go' -InstallHint 'Install Go 1.22 or newer before internet access is unavailable.'

        if (-not (Test-Path (Join-Path $projectRoot 'web/node_modules'))) {
            throw 'web/node_modules is missing. Run npm ci --prefix web while internet access is available.'
        }

        Write-Host 'Exporting static content from Go...'
        Push-Location (Join-Path $projectRoot 'server')
        go run ./cmd/exportcontent $contentOut
        if ($LASTEXITCODE -ne 0) { throw 'Go content export failed.' }
        Pop-Location

        Write-Host 'Building frontend...'
        Push-Location (Join-Path $projectRoot 'web')
        $env:VITE_STATIC = 'true'
        npm run build
        if ($LASTEXITCODE -ne 0) { throw 'The local build failed.' }
        Pop-Location
    }

    $requiredFiles = @(
        (Join-Path $dist 'index.html'),
        (Join-Path $dist '404.html')
    )
    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) { throw "Required build output is missing: $file" }
    }

    if ($ValidateOnly) {
        Write-Host "Offline deployment is ready. Bucket: $bucket"
        exit 0
    }

    Assert-Command -Name 'aws' -InstallHint 'Install AWS CLI v2 before internet access is unavailable.'
    Set-ArvanCredentials

    $deleteOption = if ($KeepRemoteFiles) { @() } else { @('--delete') }

    Write-Host "Uploading assets to s3://$bucket ..."
    & aws s3 sync $dist "s3://$bucket" `
        --endpoint-url $endpoint `
        @deleteOption `
        --exclude '*.html' `
        --cache-control 'public,max-age=604800' `
        --no-progress
    if ($LASTEXITCODE -ne 0) { throw 'Asset upload failed.' }

    Write-Host 'Uploading HTML with no-cache headers...'
    & aws s3 cp $dist "s3://$bucket" `
        --endpoint-url $endpoint `
        --recursive `
        --exclude '*' `
        --include '*.html' `
        --content-type 'text/html; charset=utf-8' `
        --cache-control 'no-cache, no-store, must-revalidate' `
        --no-progress
    if ($LASTEXITCODE -ne 0) { throw 'HTML upload failed.' }

    Write-Host "Deployment completed: s3://$bucket"
} finally {
    $env:AWS_ACCESS_KEY_ID = $null
    $env:AWS_SECRET_ACCESS_KEY = $null
    Pop-Location
}
