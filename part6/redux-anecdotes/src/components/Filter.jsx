import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const style = {
  marginBottom: 10,
};

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(filterChange(filter));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
