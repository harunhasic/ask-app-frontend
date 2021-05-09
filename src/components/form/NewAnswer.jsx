import React, { Component } from 'react';
import '../../styles/form/NewQuestion.scss'
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import QuestionField from '../core/QuestionField';
import {getUserId} from '../../utils/LocalStorage/LocalStorage'
import AnswerService from '../../services/AnswerService';
import { withRouter } from "react-router-dom";


class NewAnswer extends Component {

  constructor(props) {
    super(props);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.isRequired = this.isRequired.bind(this);
    this.answerService = new AnswerService();
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      body: '',
      userId: getUserId(),
      question_id: window.location.toString().split('#')[1],
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

  toQuestion() {
    this.props.history.push(`/question/user#${this.question_id}`)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      message: null,
      successful: false
    });
    const params = {
      body: this.state.body,
      question_id: this.state.question_id,
      user_id: getUserId()
    }
    if (!this.checkBtn.context._errors.length) {
      this.answerService.addAnswer(params).then(() => {
        this.setState({
          message: 'The answer has been posted.',
          successful: true
        });
        this.toQuestion();
        window.location.reload();
      }).catch(error => {
        this.setState({
          successful: false,
          message: 'There was an error posting the answer, please try again.'
        });
      });
    }
  }

  render() {
    return (
      <div className="new-question-container">
        <div className="question-title">
          Post a new answer to this question
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
                  label="Enter answer"
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
export default withRouter(NewAnswer);