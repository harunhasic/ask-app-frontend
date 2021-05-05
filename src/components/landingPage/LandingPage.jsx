import React, { useEffect, useState } from 'react';
import { Button, Image, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import QuestionService from '../../services/QuestionService'
import UserService from '../../services/UserService'
import '../../styles/landing/LandingPage.scss';
import QuestionList from '../map/QuestionList'
import ErrorComponent from '../error/ErrorComponent'
import { questionUrl } from '../../utils/redirect/RedicertUrls'

const questionService = new QuestionService();
const userService = new UserService();

const LandingPage = () => {

const history = useHistory();

const [questions, setQuestions] = useState([]);
const [theMostLiked, setMostLiked] = useState([]);
const [monstAnswers, setMostAnswers] = useState([]);

const toQuestion = (id) => {
  history.push(`/question/user#${id}`);   
}   

useEffect(() => {
async function fetchData() {
     try {
        await questionService.getAllQuestions().then(async response => {
        setQuestions(response.data.data);
         })
        await userService.getUsersByAnswers().then(response => {
            setMostAnswers(response.data.data)
        })
        await questionService.getMostLiked().then(response => {
        setMostLiked(response.data.data);
         })
    }catch (e) {
      
    }
  }
  fetchData();
}, []);
 
  return (
    <React.Fragment>
      <div className="landing-page-container">
      <ListGroup variant="categories">
          <ListGroup.Item className="categories-link" >Latest Questions</ListGroup.Item>
          {
            questions.map(question => (
              <ListGroup.Item key={question.id} action onClick={() => toQuestion(question.id)}>{question.body}</ListGroup.Item>
            ))
          }
        </ListGroup>
        <ListGroup variant="categories">
          <ListGroup.Item className="categories-link">Hot Questions !</ListGroup.Item>
          {
            theMostLiked.map(question => (
              <ListGroup.Item key={question.id} action onClick={() => toQuestion(question.id)}>{question.body}</ListGroup.Item>
            ))
          }
        </ListGroup>
        <ListGroup variant="categories">
          <ListGroup.Item className="categories-link">Users with most answers</ListGroup.Item>
          {
            monstAnswers.map(user => (
              <ListGroup.Item disabled key={user.user_id}>{user.firstname}</ListGroup.Item>
            ))
          }
        </ListGroup>
        </div>
    </React.Fragment>
  );
}

export default LandingPage;