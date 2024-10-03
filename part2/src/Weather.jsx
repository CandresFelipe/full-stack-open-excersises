import { useEffect, useState } from "react";
import { getWeatherForCountry } from "./services/weatherService";

export const Weather = ({ coords }) => {
  const [temperature, setTemperature] = useState();
  const [wind, setWind] = useState();

  console.log("this is render");

  useEffect(() => {
    if (!coords) return;
    getWeatherForCountry(coords).then((data) => {
      setTemperature(data.main.temp);
      setWind(data.wind.speed);
    });
  }, [coords]);

  console.log(wind);

  return (
    <div>
      <div>Temperature: {temperature}</div>
    </div>
  );
};
