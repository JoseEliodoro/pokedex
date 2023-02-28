import './index.css';

export const Button = ({ text, handleClick, disabled=false }) =>{
  return (
    <button onClick={handleClick} disabled={disabled}>{text}</button>
  );
};