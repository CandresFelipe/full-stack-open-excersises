export const Country = ({ country }) => {
  console.log(country.flags)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.name.common}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((lan) => (
          <li key={lan}>{lan}</li>
        ))}
      </ul>
      <img alt={country.alt} src={country.flags.png} />
    </div>
  )
}
