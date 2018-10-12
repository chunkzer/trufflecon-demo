import React from 'react';
import Point from './point/Point';

const HistoryFeed = ({points}) => {
  return (
    <main className="history-feed">
      {points.map(point => <Point {...point}/>)}
    </main>
  )
}

export default PointFeed
