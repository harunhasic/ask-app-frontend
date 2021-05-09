import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import QuestionService from '../../services/QuestionService';
import '../../styles/question/Question.scss'
import { getUserId, getToken, isTokenValid} from '../../utils/LocalStorage/LocalStorage';
import Question from './Question';
import Answer from './Answer';
import * as qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import ErrorComponent from '../error/ErrorComponent';
import {Button} from 'react-bootstrap';

const questionService = new QuestionService();

const QuestionPage = (loggedInState) => {

const userId = getUserId();
const token = getToken();
const history = useHistory();



const [isLoggedIn, setLoggedIn] = useState(isTokenValid());
const [hasError, setHasError] = useState(false);
const [errorMessage, setErrorMessage] = useState(null)
const [question, setQuestion] = useState();
const [answers, setAnswers] = useState([]);
const [isBusy, setBusy] = useState(true);
const [editable, setEditable] = useState(false);
const [isAnswerEditable, setIsAnswerEditable] = useState(false);
const [id, setId] = useState();

useEffect(() => {
    //The getUserId() function from local storage utils fails to give the correct id (undefined)
    const jsonUser = JSON.parse(localStorage.getItem('askapp-user'));
    setId(jsonUser.id)
    const questionId = window.location.toString().split('#')[1]
    const fetchData =async() => {
        try {
            
            await questionService.questionPage(questionId, token).then(async response => {
                const question = response.data.data;
                setQuestion(question);
            })
            await questionService.getById(questionId).then(response => {
                const answers = response.data.data.answers;
                setAnswers(answers);
            })
            setBusy(false);
       }catch (error) {
           setHasError(true);
           setErrorMessage(error.toString());
       }
     }
      fetchData();
    }, [])

return (
    <React.Fragment>
            <div className="question-container">
            {
                isTokenValid && isBusy ?
                <div className="log-message">Only logged in users can see questions. Please log in</div>           
                : 
                <Question
                    key={question.id}
                    questionBody={question.body}
                    num_of_likes={question.num_of_likes}
                    isEditable={question.is_editable}
                    id={question.id}
                    isLiked={question.is_liked}
                    />
            }

            {
                 isBusy ?
                 <div></div>
                   
               : 
               <div className="answers-container">
                   {
                       answers.map(answer => (
                           <Answer 
                            key={answer.id}
                             answerBody={answer.body}
                             author={answer.user.firstname}
                             userId={id}
                             answerUser={answer.user.id}
                             answerId={answer.id}
                           />
                       ))
                   }
               </div>
            }
            </div>
    </React.Fragment>
);

}
export default withRouter(QuestionPage);