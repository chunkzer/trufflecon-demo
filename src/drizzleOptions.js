import SimpleBid from './../build/contracts/SimpleBid.json';

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545'
    }
  },
  contracts: [
    SimpleBid,
  ],
  events: {
    SimpleBid: [
      'NewHighestBid',
      'FailedToOutbid',
      'PreviousBidsReclaimed',
      'NoBidsToReclaim',
      'BidAfterClose'
    ]
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions;
