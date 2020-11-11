import "./style.css";
function Checkbox(props) {
  const { checked, handleChange, name, type, Text, error } = props;
  return (
    <form className="checkbox">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={handleChange}
        id={name}
      />
      <label htmlFor={name}>{Text}</label>
      {error && <div className="lable-error">{error}</div>}
    </form>
  );
}
export default Checkbox;
