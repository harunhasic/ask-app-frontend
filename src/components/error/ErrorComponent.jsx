import React from 'react';
import '../../styles/error/ErrorComponent.scss'


const ErrorComponent = (message) => {

    return (
        <div className="error-container">
            <div className="error-message">
                {message.message}
            </div>
        </div>
    );
}

export default ErrorComponent;