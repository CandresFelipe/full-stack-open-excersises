export function searcher(value, allCountries) {
  if(value === '') return

  const matchedCountries = []

  allCountries.forEach((country) => {
    const name = country.name.common.toLowerCase()
    const searchInput = value.toLowerCase()

    if(name.includes(searchInput)) {
      matchedCountries.push(country)
    }
  })
  return matchedCountries
}