import katex from 'katex'

export default function FormulaDisplay({ formula, displayMode = true, className = '' }) {
  let html = ''
  try {
    html = katex.renderToString(formula, { throwOnError: false, displayMode })
  } catch {
    html = formula
  }

  return (
    <div
      className={`overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
