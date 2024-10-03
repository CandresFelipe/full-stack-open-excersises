import { useEffect, useState } from "react";
import "./styles.css";
import { getAllCountries } from "./services/countriesService";
import { searcher } from "./utils/searcher";
import { Country } from "./Country";
import { Button } from "./components/Button";
import { Weather } from "./Weather";

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
        filteredCountries.map((country, index) => (
          <div key={`${country.name.common}/${index}`}>
            <p>{country.name.common}</p>{" "}
            <Button label="show" onClick={() => onShowCountry(country)} />
          </div>
        ))}
      {filteredCountries.length === 1 && !showCountryToggle && (
        <div>
          <Country country={filteredCountries[0]} />
          <Weather coords={filteredCountries[0].latlng} />
        </div>
      )}
      {showCountryToggle && !!toShowCountry && (
        <div>
          <Country country={toShowCountry} />
          <Weather coords={toShowCountry.latlng} />
        </div>
      )}
    </div>
  );
};

export default App;
