type Props = {
  label?: string
}

export function SectionDivider({ label }: Props) {
  return (
    <div className="section-divider" role="separator" aria-hidden={!label}>
      {label ? <span className="section-divider__label">{label}</span> : null}
    </div>
  )
}
