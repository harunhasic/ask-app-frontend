import React, { useState, useEffect } from 'react';
import '../../styles/form/NewQuestion.scss'
import { withRouter } from 'react-router-dom';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

import {getUserId} from '../../utils/LocalStorage/LocalStorage'
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import UserService from '../../services/UserService';
import NameField from '../core/NameField';
import EmailField from '../core/EmailField';
import PasswordField from '../core/PasswordField';


const userService = new UserService();

const UpdateProfile= () => {

 //The getUserId() function from local storage utils fails to give the correct id (undefined)
const jsonUser = JSON.parse(localStorage.getItem('askapp-user'));
const id = (JSON.parse(jsonUser).id);

  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [isBusy, setBusy] = useState(true);

  const history = useHistory();
  const theUserId = window.location.toString().split('#')[1];

  useEffect(() => {
    
    async function fetchData() {
         try {
            await userService.userProfile(id).then(async response => {
            const user = response.data.data;
            setUser(user);
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
            setPassword("Enter password");
             })
             setBusy(false);
        }catch (error) {
          setHasError(true);
          setErrorMessage(error.toString());
        }
      }
      fetchData();
    }, []);

    function onChangeFirstName(firstname) {
        setFirstname(firstname);
      }

    function onChangeLastName(lastname) {
        setLastname(lastname);
      }
      

    function onChangeEmail(email) {
        setEmail(email);
    }

    function onChangePassword(password) {
      setPassword(password);
    }

  async function handleSubmit() {
    const theUser = user;
    const updatedUser = {
      id: user.id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }
    try {
      await userService.updateUser(updatedUser);
      setUser(updatedUser);
      setMessage( 'The answer has been edited.')
      setSuccessful(true);
      history.push(`/profile/#${user.id}`)
    } catch(error) {
      setSuccessful(false);
      setMessage( 'There was a problem with editing.')
    }
     
}


  return (
    <div className="new-question-container">
    <div className="question-title">
      Edit your information
    </div>
    <Form className='new-question-form'
      onSubmit={handleSubmit}
    >
      {isBusy ?
       <div></div>
      :  
      <div>
        <div className="form-group">
        <NameField
                  id="firstname"
                  name="firstname"
                  type="text"
                  label="First Name"
                  className="form-control"
                  value={firstname}
                  onChange={e => onChangeFirstName(e.target.value)}
                />
                <div className="form-group">
                  <NameField
                    id="lastname"
                    name="lastname"
                    type="text"
                    label="Last Name"
                    className="form-control"
                    value={lastname}
                    onChange={e => onChangeLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <EmailField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    className="form-control"
                    value={email}
                    onChange={e => onChangeEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                <NameField
                    id="password"
                    name="password"
                    type="text"
                    label="Password"
                    className="form-control"
                    value={password}
                    onChange={e => onChangePassword(e.target.value)}
                  />
                </div>
            <div className="form-group">
                <Button onClick={handleSubmit} className="button-submit">Submit</Button>
            </div>
        </div>
    </div>
      }
      {message && (
        <div className="form-group">
          <div
            className={
              successful
                ? "alert alert-success"
                : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
      <CheckButton
        className="check-button"
      />
    </Form>
  </div>
   );
}

export default withRouter(UpdateProfile);