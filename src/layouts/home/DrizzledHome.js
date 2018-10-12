import React, { PureComponent } from 'react'
import Home from './Home';
import { DrizzleContext } from "drizzle-react";

class DrizzledHome extends PureComponent {
  render() {
    return (
      <DrizzleContext.Consumer>
        {
          drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading...";
            }
            // let highestBidder;

            // let dataKey = drizzle.contracts.SimpleBid.methods.highestBid.cacheCall();


            // drizzle.contracts.SimpleBid.methods.highestBidder().call()

            return (
              <Home drizzle={drizzle} drizzleState={drizzleState} />
            );
          }
        }
      </DrizzleContext.Consumer>
    );
  }
}

export default DrizzledHome;
