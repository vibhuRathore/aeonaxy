const Button = ({ text, type, className, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-pink-400 text-white font-bold w-40 h-9 rounded-md ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
