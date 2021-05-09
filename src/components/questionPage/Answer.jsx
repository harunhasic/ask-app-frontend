import React, { useState, useEffect } from 'react';
import QuestionService from '../../services/QuestionService';
import '../../styles/answer/Answer.scss'
import { getToken, getUser, getUserId } from '../../utils/LocalStorage/LocalStorage';
import ErrorComponent from '../error/ErrorComponent';
import {Button} from 'react-bootstrap';
import { useHistory } from 'react-router';
import AnswerService from '../../services/AnswerService';

const questionService = new QuestionService();
const answerService = new AnswerService();

const Answer = ({ userId, answerUser, isEditable, answerBody, author, answerId }) => {

const [hasError, setHasError] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);
const history = useHistory();

useEffect(() => {

    }, [])

 const onDelete=()=> {
     let id = answerId;
    try {
      answerService.deleteAnswer(id);
      history.push("/");
      window.location.reload();
    } catch(e) {

    }
}

function onUpdate() {
    history.push(`/answer/update/#${answerId}`)
    window.location.reload();
}


return (
    <React.Fragment>
   
            <div className="answer-container">
            {
              !hasError ?
                <div className="answer-details"> 
                    <h2>Answer: {answerBody}</h2>
                    <h6>Author: {author}</h6>
                </div>
            : <ErrorComponent message={errorMessage}></ErrorComponent>
            }
            </div>
            {
                userId === answerUser ?
                <div>
                <Button onClick={onUpdate} className="answer-button" variant="dark">Edit Answer</Button>
                <Button onClick={onDelete} className="delete-button">Delete Answer</Button>
                </div>
                : <div></div>
            }
    </React.Fragment>
);

}
export default Answer;