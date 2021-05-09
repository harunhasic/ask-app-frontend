import React, { Component } from 'react';
import '../../styles/form/NewQuestion.scss'
import AuthService from '../../services/AuthService'
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import QuestionField from '../core/QuestionField';
import {getUserId} from '../../utils/LocalStorage/LocalStorage'
import QuestionService from '../../services/QuestionService'

 //The getUserId() function from local storage utils fails to give the correct id (undefined)
 const jsonUser = JSON.parse(localStorage.getItem('askapp-user'));
 const id = (JSON.parse(jsonUser).id);

export default class NewQuestion extends Component {

  constructor(props) {
    super(props);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.isRequired = this.isRequired.bind(this);
    this.questionService = new QuestionService();
    this.handleSubmit = this.handleSubmit.bind(this);
 
    this.state = {
      body: '',
      userId: id,
      successful: false,
      message: ''
    };
  }

  isRequired(value) {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  }

  onChangeBody(e) {
    this.setState({
      body: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: null,
      successful: false
    });
    const params = {
      body: this.state.body,
      userId: this.state.userId
    }
    if (!this.checkBtn.context._errors.length) {
      this.questionService.addQuestion(params).then(response => {
        this.setState({
          message: 'The question has been posted.',
          successful: true
        })
      }).catch(error => {
        this.setState({
          successful: false,
          message: 'There was an error posting the question, please try again.'
        });
      });
    }
  }

  render() {
    return (
      <div className="new-question-container">
        <div className="question-title">
          Post a new question
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
                <QuestionField
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