import { useState } from "react";
import { Button } from "./Button";
import { Header } from "./Header";
import { Content } from "./Content";

const App = () => {
  const [statisticOptions, setStatisticOptions] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = (event) => {
    const _value = event.target.value;
    setStatisticOptions({
      ...statisticOptions,
      [_value]: statisticOptions[_value] + 1,
    });
  };

  return (
    <div>
      <Header title={"Give Feedback"} />
      {Object.keys(statisticOptions).map((key, index) => (
        <Button
          key={index}
          label={key}
          value={key}
          type="button"
          onClick={(e) => handleClick(e)}
        />
      ))}
      <Header title={"Statistic"} />
      <Content options={statisticOptions} />
    </div>
  );
};

export default App;
