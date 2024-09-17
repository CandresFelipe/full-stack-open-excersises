export const Filter = ({ filterValue, onFilter }) => {
  return (
    <div>
      Filter shown with: <input value={filterValue} onChange={onFilter} />
    </div>
  );
};
