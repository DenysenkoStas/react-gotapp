import React from 'react';
import './spinner.css';

const Spinner = () => {
    return (
        <div className="loadingio-spinner">
            <div className="lds-spin">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}

export default Spinner;