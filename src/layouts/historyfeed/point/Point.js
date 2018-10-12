import React, { Component } from 'react';

const Point = ({message, severity, data}) => {
  return (
    <div className="alert">
      <div className="close-button"> X</div>
      <div className="message">
        {message}
      </div>
      <div className="data-block">
        {Object.keys(data).map(key => {
          return (
            <div>
              <span>{key}: {data[key]}</span>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default Alert
