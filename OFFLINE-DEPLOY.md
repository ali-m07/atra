# انتشار دستی روی آروان هنگام قطعی اینترنت

این مسیر به GitHub وابسته نیست. Build روی کامپیوتر انجام می‌شود و خروجی مستقیماً در صندوقچه‌ی `atra-site` قرار می‌گیرد.

## آماده‌سازی؛ یک‌بار قبل از قطعی

Node.js، Go، AWS CLI v2 و وابستگی‌های پروژه باید از قبل نصب باشند:

```powershell
cd web
npm ci
cd ..
aws --version
go version
```

برای اطمینان از آماده‌بودن پروژه:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy-arvan.ps1 -ValidateOnly
```

## Build و انتشار مستقیم

در PowerShell وارد پوشه‌ی پروژه شوید و اجرا کنید:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy-arvan.ps1
```

اسکریپت Access Key و Secret Key اروان را درخواست می‌کند. Secret Key هنگام تایپ نمایش داده نمی‌شود و هیچ کلیدی روی دیسک ذخیره نخواهد شد.

## انتشار خروجی موجود بدون Build مجدد

اگر قبلاً `web/dist/` را ساخته‌اید:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy-arvan.ps1 -SkipBuild
```

به‌صورت پیش‌فرض فایل‌هایی که دیگر در `web/dist/` وجود ندارند از صندوقچه نیز حذف می‌شوند. برای نگه‌داشتن فایل‌های قدیمی:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy-arvan.ps1 -KeepRemoteFiles
```

## نکته‌های قطعی اینترنت

- پوشه‌ی `web/node_modules/` را پاک نکنید.
- Node.js، Go و AWS CLI را از قبل نصب نگه دارید.
- این روش تنها به دسترسی شبکه به `s3.ir-thr-at1.arvanstorage.ir` نیاز دارد.
- برای نمایش تغییرات فوری، در پنل CDN آروان Purge Cache انجام دهید.
