import React, { useState, useEffect } from 'react';
import '../../styles/form/NewQuestion.scss'

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

import {getUserId} from '../../utils/LocalStorage/LocalStorage'
import AnswerService from '../../services/AnswerService'
import UpdateField from '../core/UpdateField';
import ErrorComponent from '../error/ErrorComponent'
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';

const answerService = new AnswerService();

const UpdateAnswer= () => {

  const [answer, setAnswer] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [body, setBody] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [isBusy, setBusy] = useState(true);

  const history = useHistory();
  const answerId = window.location.toString().split('#')[1];

  useEffect(() => {
    
    async function fetchData() {
         try {
            await answerService.getById(answerId).then(async response => {
            setAnswer(response.data.data);
            setBody(response.data.data.body);
             })
             setBusy(false);
        }catch (error) {
          setHasError(true);
          setErrorMessage(error.toString());
        }
      }
      fetchData();
    }, []);

    function onChangeBody(body) {
      setBody(body);
    }


  async function handleSubmit() {
    const theAnswer = answer;
    const updatedAnswer = {
      id: theAnswer.id,
      question_id: theAnswer.question_id,
      body: body
    }
    try {
      await answerService.updateAnswer(updatedAnswer);
      setAnswer(updatedAnswer);
      setMessage( 'The answer has been edited.')
      setSuccessful(true);
      history.push(`/question/user#${updatedAnswer.question_id}`)
    } catch(error) {
      setSuccessful(false);
      setMessage( 'There was a problem with editing.')
    }
     
}

  return (
    <div className="new-question-container">
    <div className="question-title">
      Edit the Answer
    </div>
    <Form className='new-question-form'
      onSubmit={handleSubmit}
    >
      {isBusy ?
       <div></div>
      :  
      <div>
        <div className="form-group">
            <UpdateField
            id="body"
            name="body"
            type="text"
            label="Enter Question"
            className="question-body"
            value={body}
            onChange={e => onChangeBody(e.target.value)}
            />
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

export default UpdateAnswer