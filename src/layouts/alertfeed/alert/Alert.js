import React from 'react';

const Alert = ({message, severity, data}) => {
  return (
    <div className={`alert-${severity}`}>
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

const mockAlert = {
  "message": "There is a new highest bid!",
  "severity": "green",
  "data": {"bidder": "0x0", bid: "1 eth"}
}
