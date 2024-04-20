const Input = ({ name, label, error, type, value, onChange }) => {
  const isInvalid = typeof error === "string" && error !== "";
  const textColor = isInvalid ? "text-red-400" : "text-black";
  const bgColor = isInvalid ? "bg-red-50" : "bg-slate-100";

  return (
    <div className={`flex flex-col w-full ${textColor}`}>
      <label className="font-bold text-black" htmlFor={name}>
        {label}
      </label>
      <input
        className={`p-1.5 text-sm rounded-sm font-medium outline-none ${bgColor}`}
        type={type}
        value={value}
        onChange={onChange}
      />
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default Input;
