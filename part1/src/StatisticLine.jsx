export const StatisticLine = ({ label, value }) => {
  return (
    <tbody>
      <tr>
        <td>{label}</td>
        <td align="center">{value}</td>
      </tr>
    </tbody>
  );
};
