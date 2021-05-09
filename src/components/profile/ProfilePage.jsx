import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Image, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import QuestionService from '../../services/QuestionService'
import UserService from '../../services/UserService'
import '../../styles/profile/Profile.scss';
import QuestionList from '../map/QuestionList'
import ErrorComponent from '../error/ErrorComponent'
import { questionUrl } from '../../utils/redirect/RedicertUrls'
import { getUserId } from '../../utils/LocalStorage/LocalStorage';

const questionService = new QuestionService();
const userService = new UserService();
let pageNumber = 1;

const ProfilePage = () => {

    
//The getUserId() function from local storage utils fails to give the correct id (undefined)
const jsonUser = JSON.parse(localStorage.getItem('askapp-user'));
const id = (JSON.parse(jsonUser).id);

const history = useHistory();
const userId= getUserId();
const [questions, setQuestions] = useState([]);
const [user, setUser] = useState(null);
const [isBusy, setBusy] = useState(true);
const [loading, setLoading] = useState(false);

useEffect(() => {
async function fetchData() {
     try {
        await userService.userProfile(id).then(response => {
            const user = response.data.data;
            setUser(user); 
            setBusy(false);            
        })
        await questionService.getByUserId(id, {page:1, limit:20}).then(response => {
          const questions = response.data.data;
          setQuestions(questions);
        })
        
    }catch (e) {
      
    }
  }
  fetchData();
}, []);

const toQuestion = (id) => {
  history.push(`/question/user#${id}`);   
}   

const toUpdate =() => {
    history.push(`/edit/user/${id}`)
}

const showMoreQuestions = async () => {
  setLoading(true);
  pageNumber++;
  const showMore = {
      page: pageNumber,
      userId: id,
      limit:20
  }
  try {
      const moreQuestions = await questionService.getByUserId(id, showMore);
      setQuestions([...questions, ...moreQuestions.data.data])
  } catch (e) {
    pageNumber--;
  }
  setLoading(false);
}

  return (
    <React.Fragment>
      <div className="landing-page-container">
          { isBusy ?
                <div></div>
         :     
         <div className="profile-info"> 
         
          <div className="user-info">
            <ListGroup>
                <ListGroup.Item>User info</ListGroup.Item>
                <ListGroup.Item>Firstname: {user.firstname}</ListGroup.Item>
                <ListGroup.Item>Lastname: {user.lastname}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email}</ListGroup.Item>
            </ListGroup>
            <Button onClick={toUpdate} className="edit-user-button" >Edit your information</Button>
          </div>
          <div className="questions-user">
            <ListGroup variant="categories" className="user-question-group">

                <ListGroup.Item className="questions-list" >Your questions</ListGroup.Item>
                    {
                      questions.map(question => (
                          <ListGroup.Item key={question.id} action onClick={() => toQuestion(question.id)}>{question.body}</ListGroup.Item>
                      ))
                    }
                    
                        {
                          questions.length >=20 ?
                            <div className="show-more">
                                <Button disabled={loading} onClick={showMoreQuestions} className="show-more-button">
                                    Show more questions
                                </Button>
                            </div> 
                          : null
                        }
                    </ListGroup>
                </div>
                    </div>
                    }
                
        </div>
    </React.Fragment>
  );
}

export default withRouter(ProfilePage);