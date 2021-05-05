import React, { useState, useEffect } from 'react';
import QuestionService from '../../services/QuestionService';
import '../../styles/question/Question.scss'
import { getToken, getUserId } from '../../utils/LocalStorage/LocalStorage';
import ErrorComponent from '../error/ErrorComponent';
import {Button} from 'react-bootstrap';
import { useHistory } from 'react-router';

const questionService = new QuestionService();

const Question = ({ id, isEditable, questionBody, num_of_likes }) => {

const [hasError, setHasError] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);
const token = getToken();
const history = useHistory();

 const onDelete=()=> {
    let questionId = id;
    try {
      questionService.deleteQuestion(questionId);
      history.push("/");
      window.location.reload();
    } catch(e) {

    }
}

function onUpdate() {
    history.push(`/question/update/#${id}`)
    window.location.reload();
}

return (
    <React.Fragment>
   
            <div className="question-container">
            {
              !hasError ?
                <div> 
                    <h2>Question: {questionBody}</h2>
                    <h5>Number of likes: {num_of_likes}</h5>
                </div>
            : <ErrorComponent message={errorMessage}></ErrorComponent>
            }
            </div>
            {
                isEditable ?
                <div>
                <Button onClick={onUpdate} variant="dark">Edit Question</Button>
                <Button onClick={onDelete} variant="danger">Delete Question</Button>
                </div>
                : <div></div>
            }
    </React.Fragment>
);

}
export default Question;