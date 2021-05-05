import React from 'react';
import Input from 'react-validation/build/input';
import { InputGroup, FormControl } from 'react-bootstrap'

function QuestionCheck(value) {
  if (value.length < 5 || value.length > 500) {
    return (
      <div className="error-msg" role="alert">
        Please enter a question between 5 and 500 characters long.
      </div>
    );
  }
};


const QuestionField = ({ label, validation, ...props }) => {
  return (
    <div className={"props"}>
      <label>{label}</label>
      <textarea {...props} validations={[QuestionCheck]} />
    </div>
  );
}
export default QuestionField;