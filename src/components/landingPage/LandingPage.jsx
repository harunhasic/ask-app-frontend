import React, { useEffect, useState } from 'react';
import { Button, Image, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import QuestionService from '../../services/QuestionService'
import UserService from '../../services/UserService'
import '../../styles/landing/LandingPage.scss';


const questionService = new QuestionService();
const userService = new UserService();
let pageNumber = 1;
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
        await questionService.getAllQuestions({page:1, limit:20}).then(async response => {
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
 
const showMoreQuestions = async () => {
  pageNumber++;
  const showMore = {
      page: pageNumber,
      limit:20
  }
  try {
      const moreQuestions = await questionService.getAllQuestions(showMore);
      setQuestions([...questions, ...moreQuestions.data.data])
  } catch (e) {
    pageNumber--;
  }
}

  return (
    <React.Fragment>
      <div className="landing-page-container">
      <ListGroup className="question-group" >
          <ListGroup.Item className="categories-link" >Latest Questions</ListGroup.Item>
          {
            questions.map(question => (
              <ListGroup.Item key={question.id} action onClick={() => toQuestion(question.id)}>{question.body}</ListGroup.Item>
            ))
          }
           {
                  questions.length >=20 ?
                    <div className="explore-more">
                        <Button onClick={showMoreQuestions} className="show-more-button">
                            SHOW MORE QUESTIONS
                        </Button>
                    </div> 
                  : null
                }
      </ListGroup>
      <div>
        <ListGroup className="question-group" >
          <ListGroup.Item className="categories-link">Hot Questions !</ListGroup.Item>
          {
            theMostLiked.map(question => (
              <ListGroup.Item key={question.id} action onClick={() => toQuestion(question.id)}>{question.body}</ListGroup.Item>
            ))
          }
      </ListGroup>
      </div>
      <div>
        <ListGroup className="question-group" >
          <ListGroup.Item className="categories-link">Users with most answers</ListGroup.Item>
          {
            monstAnswers.map(user => (
              <ListGroup.Item disabled key={user.user_id}>{user.firstname}</ListGroup.Item>
            ))
          }
        </ListGroup>
        </div>
        </div>
        
    </React.Fragment>
  );
}

export default LandingPage;