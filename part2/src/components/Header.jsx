export const Header = (props) => {
  const { title, variant = 'h1' } = props
  if (variant === 'h2') {
    return <h2>{title}</h2>
  } else if (variant === 'h3') {
    return <h3>{title}</h3>
  } else {
    return <h1>{title}</h1>
  }
}
