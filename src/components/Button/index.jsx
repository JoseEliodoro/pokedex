import './index.css';

export const Button = ({ text, handleClick, disabled=false }) =>{
  return (
    <a href="#topo">
      <button
        className='btn_more'
        onClick={handleClick}
        disabled={disabled}
      >
        {text}
      </button>
    </a>
  );
};