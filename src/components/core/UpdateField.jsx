import React from 'react';
import Input from 'react-validation/build/input';
import { InputGroup, FormControl } from 'react-bootstrap'


const UpdateField = ({ label, ...props }) => {
  return (
    <div className={"props"}>
      <label>{label}</label>
      <textarea {...props} />
    </div>
  );
}
export default UpdateField;