import React, { PureComponent } from 'react';
import boris from '../../boris2.png';
import AlertFeed from '../alertfeed/AlertFeed';
import utils from 'web3-utils'

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      highestBidDataKey: null,
      highestBidderDataKey: null,
      previousBidsDataKey: null,
      bidValue: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitBid = this.submitBid.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {

    let highestBidDataKey = this.props.drizzle.contracts.SimpleBid.methods.highestBid.cacheCall()
    let highestBidderDataKey = this.props.drizzle.contracts.SimpleBid.methods.highestBidder.cacheCall()
    let previousBidsDataKey = this.props.drizzle.contracts.SimpleBid.methods.previousBids.cacheCall(this.props.drizzleState.accounts[0])
    this.setState({ highestBidDataKey, highestBidderDataKey, previousBidsDataKey});
  }

  handleChange(event) {
    this.setState({bidValue: event.target.value});
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.submitBid();
    }
  }

  reclaimBid = () => {
    this.props.drizzle.contracts.SimpleBid.methods.reclaimBid.cacheSend({gas: 4254755})
  }

  submitBid = () => {
    this.props.drizzle.contracts.SimpleBid.methods.bid.cacheSend({value: utils.toWei(this.state.bidValue), gas: 4254755})
  }

  render() {

    const SimpleBid = this.props.drizzleState.contracts.SimpleBid
    const { highestBidder, highestBid, previousBids } = SimpleBid
    let previousBidsChunk = null;

    if(previousBids[this.state.previousBidsDataKey]){
      if(previousBids[this.state.previousBidsDataKey].value > 0){
        previousBidsChunk = (
          <React.Fragment>
            <p>You've got { utils.fromWei(previousBids[this.state.previousBidsDataKey].value) } unreclaimed eth from previous bids</p>
            <button onClick={this.reclaimBid}>Reclaim!</button>
          </React.Fragment>
        )
      }
    }



    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={boris} alt="drizzle-logo" style={{width: 300, heigth: 300}} />
            <h1>Simple Bid</h1>
            <p>A simple bidding application with some event alerts.</p>
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Current Account: {this.props.drizzleState.accounts[0]} </h2>
            <h2>Highest Bidder:  { highestBidder[this.state.highestBidderDataKey] ? highestBidder[this.state.highestBidderDataKey].value : 'Loading...' }</h2>
            <p>Current Bid: { highestBid[this.state.highestBidDataKey] ? utils.fromWei(highestBid[this.state.highestBidderDataKey].value) : 'Loading...' } </p>
            {previousBidsChunk}
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <span>New Bid:</span>
            <input value={this.state.bidValue} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
            <button onClick={this.submitBid}>Submit</button>
            <br/><br/>
          </div>
        </div>
        <AlertFeed alerts={[mockAlert]}/>
      </main>
    )
  }
}

const mockAlert = {
  "message": "There is a new highest bid!",
  "severity": "greyx",
  "data": {"bidder": "0x0", bid: "1 eth"}
}

export default Home
