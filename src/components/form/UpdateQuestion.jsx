import React, { useState, useEffect } from 'react';
import '../../styles/form/NewQuestion.scss'

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

import {getUserId} from '../../utils/LocalStorage/LocalStorage'
import QuestionService from '../../services/QuestionService'
import UpdateField from '../core/UpdateField';
import ErrorComponent from '../error/ErrorComponent'
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';

const questionService = new QuestionService();

const UpdateQuestion= () => {

  const [question, setQuestion] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [body, setBody] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [isBusy, setBusy] = useState(true);

  const history = useHistory();
  const questionId = window.location.toString().split('#')[1];

  useEffect(() => {
    async function fetchData() {
         try {
            await questionService.getById(questionId).then(async response => {
            const question = response.data.data;
            setQuestion(question);
            setBody(question.body);
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
    const theQuestion = question;
    const updatedQuestion = {
      id: question.id,
      body: body
    }
    try {
      await questionService.updateQuestion(updatedQuestion);
      setQuestion(updatedQuestion);
      setMessage( 'The question has been updated.');
      setSuccessful(true);
      history.push(`/question/user#${question.id}`)
    } catch(error) {
      setSuccessful(false);
      setMessage( 'There was a problem with updating.')
    }
}

  return (
    <div className="new-question-container">
    <div className="question-title">
      Edit the question
    </div>
    <Form className='new-question-form'
      onSubmit={handleSubmit}
    >
      {isBusy ?
       <div></div>
      :   <div>
      <div className="form-group">
        <UpdateField
          id="body"
          name="body"
          type="text"
          label="Edit your qestion"
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

export default UpdateQuestion