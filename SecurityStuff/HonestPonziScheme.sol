// HonestPonziScheme is a trustless ponzi scheme where people pay one ether to be 
// part of the current tier ponzi scheme. When the tier is full, the previous tier is paid
// and current teir will become paid once the level below them is filled
// Levels are 1,2,4,8,16,32,64,128,256,512,1024, etc

contract HonestPonziScheme {
  address[] public previousTier; // These people will be paid once current tier is full
  address[] public currentTier;
  uint256 public numberToFillTier;

  function HonestPonziScheme() {
    previousTier.push(msg.sender);
    numberToFillTier = 2;
  }

  function buyin() payable {
    require(msg.value == 1 ether);
    require(currentTier.length < numberToFillTier);
    currentTier.push(msg.sender);
  }

  function payout() internal {
    require(currentTier.length == numberToFillTier);
    uint256 individualPayout = this.balance / previousTier.length;
    for (var i = 0; i < previousTier.length; i++) {
      previousTier[i].transfer(individualPayout);
    }
    previousTier = currentTier;
    numberToFillTier *= 2;
    currentTier = new address[](0);
  }
}