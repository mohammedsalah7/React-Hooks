import "./style.css";

export const RegisterBtn = (props) => {
  const { children, className, handleClick } = props;
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
export const LogInBtn = (props) => {
  const { children, className, handleClick, type } = props;
  return (
    <button className={className} type={type} onClick={handleClick}>
      {children}
    </button>
  );
};
export const OR = (props) => {
  const { className } = props;
  return <span className={className}>Or</span>;
};
