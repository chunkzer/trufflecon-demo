import React from 'react';
import Alert from './alert/Alert';

const AlertFeed = ({alerts}) => {
  return (
    <main className="alert-feed">
      {alerts.map(alert => <Alert {...alert}/>)}
    </main>
  )
}

export default AlertFeed
