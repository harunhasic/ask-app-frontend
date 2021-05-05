import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import QuestionService from '../../services/QuestionService';
import '../../styles/question/Question.scss'
import { getUserId, getToken} from '../../utils/LocalStorage/LocalStorage';
import Question from './Question'
import * as qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import ErrorComponent from '../error/ErrorComponent';
import {Button} from 'react-bootstrap';

const questionService = new QuestionService();

const QuestionPage = ({match}) => {

const userId = getUserId();
const token = getToken();
const history = useHistory();
const urlParams = qs.parse(history.location.search);

const [hasError, setHasError] = useState(false);
const [errorMessage, setErrorMessage] = useState(null)
const [question, setQuestion] = useState();
const [isBusy, setBusy] = useState(true)

useEffect(() => {
    const questionId = window.location.toString().split('#')[1]
    const fetchData =async() => {
        try {
            await questionService.questionPage(questionId, token).then(async response => {
                const question = response.data.data;
                setQuestion(question);
                setBusy(false);
            })
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
              isBusy ?
              <ErrorComponent message={errorMessage}></ErrorComponent>
                
            : 
            <Question
                questionBody={question.body}
                num_of_likes={question.num_of_likes}
                isEditable={question.is_editable}
                id={question.id}/>
            }
            </div>
          
    </React.Fragment>
);

}
export default withRouter(QuestionPage);