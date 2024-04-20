import { useState } from "react";
import { Check } from "react-feather";

const UserTypeBox = ({ text, image, name, value, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const newCheckedValue = !checked;
    setChecked(newCheckedValue);
    onChange?.(newCheckedValue);
  };

  return (
    <label
      className={`flex flex-col items-center gap-1 select-none rounded outline-1 outline-double p-4 ${
        checked ? "outline-pink-400" : "outline-stone-300"
      } max-w-72`}
      onClick={handleClick}
    >
      <div className="aspect-square flex items-center">
        <img src={image} className="object-contain w-full h-full" />
      </div>
      <div className="grow flex flex-col items-center justify-between">
        <p className="font-semibold">{text}</p>
        <span
          className={`w-4 h-4 inline-flex justify-center items-center text-white rounded-full m-1 ${
            checked
              ? "bg-pink-400"
              : "outline-stone-300 outline-1 outline-double"
          } shrink-0 p-0.5`}
        >
          {checked && <Check strokeWidth={4} />}
        </span>
      </div>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        readOnly
        className="hidden"
      />
    </label>
  );
};

export default UserTypeBox;
