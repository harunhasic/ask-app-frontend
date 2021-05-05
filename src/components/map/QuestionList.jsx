import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/map/QuestionList.scss'

const QuestionList = ({ questions }) => {

return (
    <React.Fragment>
        <Container className="question-list-container">
            <Row >
                <Col className="question-list-name">{questions.body}
                    {
                        questions.map(question => (
                            <Col className="answer-name" key={question.id} >{question.body}</Col>
                        ))
                    }
                </Col>
            </Row>
        </Container>
    </React.Fragment>

    );
}

export default QuestionList;