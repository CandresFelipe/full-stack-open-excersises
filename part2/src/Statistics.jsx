import { StatisticLine } from "./StatisticLine";

export const Statistics = ({ statisticData }) => {
  const calculateAverage = () => {
    const total = Object.values(statisticData).reduce(
      (prev, curr) => curr + prev,
      0
    );

    if (total === 0) return 0;

    const calculatedSum =
      statisticData.good * 1 +
      statisticData.neutral * 0 +
      statisticData.bad * -1;

    return calculatedSum / total;
  };

  const calculatePositiveFeedback = () => {
    const total = Object.values(statisticData).reduce(
      (prev, curr) => curr + prev,
      0
    );

    if (total === 0) return 0;
    return (statisticData.good / total) * 100;
  };
  return (
    <table align="left">
      <StatisticLine label="good" value={statisticData.good} />
      <StatisticLine label="neutral" value={statisticData.neutral} />
      <StatisticLine label="bad" value={statisticData.bad} />
      <StatisticLine label="Average" value={calculateAverage()} />
      <StatisticLine
        label="Positive feedback"
        value={`${calculatePositiveFeedback()} %`}
      />
    </table>
  );
};
