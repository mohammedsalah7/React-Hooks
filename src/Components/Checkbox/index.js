import "./style.css";
function Checkbox(props) {
  const { checked, handleChange, name, type, Text, error } = props;
  return (
    <div className="checkbox">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={handleChange}
        id={name}
      />
      <label htmlFor={name}>{Text}</label>
      {error && <div className="lable-error">{error}</div>}
    </div>
  );
}
export default Checkbox;
