pragma solidity ^0.4.23;

contract SimpleBid {
  event NewHighestBid(
    string _message,
    address _bidder,
    uint _newHigh
  );

  event FailedToOutbid(
    string _message,
    address _bidder
  );

  event PreviousBidsReclaimed(
    string _message,
    address _bidder,
    uint _reclaimedAmount
  );

  event NoBidsToReclaim(
    string _message,
    address _bidder
  );

  event BidAfterClose(
    string _message,
    address _bidder,
    uint _bidAmount
  );

  uint public highestBid;
  uint public closingTime;
  address public highestBidder;
  mapping(address => uint) public previousBids;

  constructor() public payable {
    highestBid = msg.value;
    highestBidder = msg.sender;
    closingTime = now + (1 days);
  }

  function bid() public payable {
    if(now < closingTime) {
      if(msg.value > highestBid){
        previousBids[highestBidder] += highestBid;
        highestBid = msg.value;
        highestBidder = msg.sender;
        emit NewHighestBid("There is a new highest bid!", msg.sender,  msg.value);
      }else{
        msg.sender.transfer(msg.value);
        emit FailedToOutbid("Fell short of the highest bid!", msg.sender);
      }
    }else{
      previousBids[msg.sender] += msg.value;
      emit BidAfterClose("A participant bid after closing time!", msg.sender,  msg.value);
    }
  }

  function reclaimBid() public {
    if(previousBids[msg.sender] > 0){
      uint reclaimedAmount = previousBids[msg.sender];
      previousBids[msg.sender] = 0;
      msg.sender.transfer(reclaimedAmount);
      emit PreviousBidsReclaimed("A participant has reclaimed their previous bids", msg.sender, reclaimedAmount);
    }else{
      emit NoBidsToReclaim("A participant has attempt to reclaim previous bids from a 0 balance address", msg.sender);
    }
  }
}
