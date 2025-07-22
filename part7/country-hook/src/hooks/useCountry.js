import axios from "axios";
import { useState, useEffect } from "react";

const countryFetchURL = "https://studies.cs.helsinki.fi/restcountries/api/name";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!name) return;

    setLoading(true);
    axios.get(`${countryFetchURL}/${name}`).then((data) => {
        setCountry({
            name: data.data.name.common,
            capital: data.data.capital,
            population: data.data.population,
            flag: data.data.flags.svg,
            found: true,
        })
    }).catch((error) => {
        if(error.response.status === 404) {
            setCountry({
                found: false,
            })
        }
        console.log('Error Fetching country', error);
    }).finally(() => {
        setLoading(false)
    })
  }, [name])

  return {
    country,
    loading,
  }
}
