import React, { Component } from 'react';
import '../../styles/form/NewQuestion.scss'
import AuthService from '../../services/AuthService'
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import QuestionField from '../core/QuestionField';
import {getUserId} from '../../utils/LocalStorage/LocalStorage'
import QuestionService from '../../services/QuestionService'
import UpdateField from '../core/UpdateField';
import Question from '../questionPage/Question';

export default class UpdateQuestion extends Component {

  constructor(props) {
    super(props);

    this.questionService = new QuestionService();
    this.onChangeBody = this.onChangeBody.bind(this);
    this.state = {
      id:'',
      body: '',
      userId: getUserId(),
      successful: false,
      message: ''
    };
    
  }

  getQuestionDetails() {
    let questionId = window.location.toString().split('#')[1];
     this.questionService.getById(questionId).then(response => {
        this.setState({
          id: response.data.data.id,
          body: response.data.data.body,
    }, ()=> {
        console.log(this.state);
    })
  }
  )}

  componentWillMount() {
      this.getQuestionDetails();
  }

  onChangeBody(e) {
    this.setState({
      body: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    const params = {
      questionId: this.refs.id.value,
      body: this.refs.body.value,
      userId: getUserId()
    }
    if (!this.checkBtn.context._errors.length) {
      this.questionService.updateQuestion(params).then(response => {
        this.setState({
          message: 'The question has been edited.',
          successful: true
        })
      }).catch(error => {
        this.setState({
          successful: false,
          message: 'There was an error updating the question, please try again.'
        });
      });
    }
  }

  render() {
    return (
      <div className="new-question-container">
        <div className="question-title">
          Edit your question
        </div>
        <Form className='new-question-form'
          onSubmit={this.handleSubmit}
          ref={c => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="form-group">
                <UpdateField
                  id="body"
                  name="body"
                  type="text"
                  label="Enter Question"
                  className="question-body"
                  value={this.state.body}
                  onChange={(e) => this.onChangeBody(e)}
                />
                <div className="form-group">
                  <button className="button-submit">Submit</button>
                </div>
              </div>
            </div>
          )}
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
          <CheckButton
            className="check-button"
            ref={c => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
    )
  }
}