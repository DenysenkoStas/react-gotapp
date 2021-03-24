import React from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <div className="error-message rounded">
            {/* <img src={process.env.PUBLIC_URL + '/img/got.jpeg'} alt="error"/> - если папка public */}
            <img src={img} alt="error"/>
            <span>Something went wrong</span>
        </div>
    )
}

export default ErrorMessage;