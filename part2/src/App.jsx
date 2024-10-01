import { useEffect, useState } from "react";
import "./styles.css";
import { getAllCountries } from "./services/countriesService";
import { searcher } from "./utils/searcher";
import { Country } from "./Country";
import { Button } from "./components/Button";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showCountryToggle, setShowCountryToggle] = useState(false);
  const [toShowCountry, setToShowCountry] = useState();

  const onHandleInput = (e) => {
    setInputValue(e.target.value);
    setShowCountryToggle(false);
  };

  useEffect(() => {
    if (inputValue === "") {
      setFilteredCountries([]);
      return;
    }
    const filteredData = searcher(inputValue, countries);
    setFilteredCountries(filteredData);
  }, [inputValue]);

  useEffect(() => {
    getAllCountries().then((data) => setCountries(data));
  }, []);

  const onShowCountry = (country) => {
    setShowCountryToggle(true);
    setToShowCountry(country);
  };

  return (
    <div>
      <p>Find contries</p>
      <input value={inputValue} onChange={onHandleInput} />
      {filteredCountries.length > 10 && !showCountryToggle && (
        <p>Too many countries, specify another filter.</p>
      )}
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        !showCountryToggle &&
        filteredCountries.map((country) => (
          <>
            <p key={country.name.common}>{country.name.common}</p>{" "}
            <Button label="show" onClick={() => onShowCountry(country)} />
          </>
        ))}
      {filteredCountries.length === 1 && !showCountryToggle && (
        <Country country={filteredCountries[0]} />
      )}
      {showCountryToggle && !!toShowCountry && (
        <Country country={toShowCountry} />
      )}
    </div>
  );
};

export default App;
