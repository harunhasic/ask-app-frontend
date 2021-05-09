import React from 'react';
import Input from 'react-validation/build/input';
import '../../styles/core/Input.scss'

function vpassword(value) {
  if (value.length < 5 || value.length > 40) {
    return (
      <div className="error-msg" role="alert">
        The password must be between 5 and 40 characters.
      </div>
    );
  }
};
const PasswordField = ({ label, ...props }) => {
  return (
    <div className={"...props"}>
      <label>{label}</label>
      <Input {...props} validations={[vpassword]} />
    </div>
  );
}
export default PasswordField;