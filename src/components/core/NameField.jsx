import React from 'react';
import Input from 'react-validation/build/input';


const NameField = ({ label, validation, ...props }) => {
  return (
    <div className={"props"}>
      <label>{label}</label>
      <Input {...props} />
    </div>
  );
}
export default NameField;