import React from 'react';
import './style.css';
interface TypeCheckboxProps {
  typechecklist: string;
  onChange: (newTypes: string) => void;
}

const TypeCheckbox: React.FC<TypeCheckboxProps> = ({ typechecklist, onChange }) => {
  // แปลง typechecklist เป็นอาร์เรย์ของสตริง
  const typechecklistArray = typechecklist.split(',').map(type => type.trim()).filter(type => type.length > 0);

  const types = ['ผี', 'ตลก', 'นิยาย', 'ฮา'];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const newTypes = checked
      ? [...typechecklistArray, value]
      : typechecklistArray.filter((type) => type !== value);

    // แปลง newTypes กลับเป็น string
    const newTypesString = newTypes.join(', ');
    onChange(newTypesString);
  };

  return (
    <>
    
    <p>หมวดหมู่</p>
      {types.map((type) => (
        <div key={type}>
          <input className="custom-checkbox"
            type="checkbox"
            id={type}
            value={type}
            checked={typechecklistArray.includes(type)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={type}>{type}</label>
        </div>
      ))}
    </>
  );
};

export default TypeCheckbox;
