import React, { useState, useEffect } from 'react';
import QuestionService from '../../services/QuestionService';
import '../../styles/question/Question.scss'
import { getToken, getUserId } from '../../utils/LocalStorage/LocalStorage';
import ErrorComponent from '../error/ErrorComponent';
import {Button} from 'react-bootstrap';
import { useHistory } from 'react-router';

const questionService = new QuestionService();

const Question = ({ id, isEditable, questionBody, num_of_likes, isLiked }) => {

const [hasError, setHasError] = useState(false);
const [errorMessage, setErrorMessage] = useState(null);
const [loading, setLoading] = useState(false);
const token = getToken();
const history = useHistory();
const userId = getUserId();

 const onDelete=()=> {
    let questionId = id;
    try {
      questionService.deleteQuestion(questionId);
      history.push("/");
      window.location.reload();
    } catch(e) {

    }
}

const like=()=> {
    let questionId = id;
    try {
         questionService.likeQuestion(questionId);
         window.location.reload();
    } catch(e) {

    }
}

const dislike=()=> {
    let questionId = id;
    try {
         questionService.dislikeQuestion(questionId);
         window.location.reload();
    } catch(e) {
        
    }
}
function onUpdate() {
    history.push(`/question/update/#${id}`)
}

function toAnswer() {
    history.push(`/questions/answer/new/#${id}`)
}

return (
    <React.Fragment>
   
            <div className="question-container">
            {
              !hasError ?
                <div className="question-details"> 
                    <h2>Question: {questionBody}</h2>
                    <h5>Number of likes: {num_of_likes}</h5>
                   {
                       userId !== null ?
                         <Button className="post-button" onClick={toAnswer}>Post a new answer</Button>
                       : <div></div>
                   }
                   {
                       isLiked ?
                       <Button onClick={dislike} className="dislike-button">Dislike</Button>
                       : 
                       <Button onClick={like} className="like-button">Like</Button>
                   }
                </div>
            : <ErrorComponent message={errorMessage}></ErrorComponent>
            }
            </div>
            {
                isEditable ?
                <div className="buttons-div">
                <Button className="answer-button"  onClick={onUpdate} >Edit Question</Button>
                <Button className="delete-button"  onClick={onDelete}>Delete Question</Button>
                </div>
                : <div></div>
            }
    </React.Fragment>
);

}
export default Question;