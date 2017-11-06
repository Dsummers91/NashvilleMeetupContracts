pragma solidity ^0.4.16;

contract NashvilleBeerToken {
  uint256 public maxSupply;
  uint256 public totalSupply;
  address public owner;
  mapping (address => uint256) balances;

  event LogBeerClaimed(address indexed owner);
  event LogBeerRedeemed(address indexed owner, bytes32 name);
  event LogTransfer(address from, address indexed to);

  modifier onlyOwner {
    require(owner == msg.sender);
    _;
  }

  function NashvilleBeerToken(uint256 _maxSupply) {
    maxSupply = _maxSupply;
    owner = msg.sender;
  }

  function transfer(address _to, uint256 _amount) public returns(bool) {
    require(balances[msg.sender] - _amount <= balances[msg.sender]);
    balances[msg.sender] -=  _amount;
    balances[_to] += _amount;
    LogTransfer(msg.sender, _to);
  }

  function balanceOf(address _owner) public constant returns(uint) {
    return balances[_owner];
  }

  function redeemBeer(bytes32 _name) public returns(bool) {
    require(balances[msg.sender] > 0);
    balances[msg.sender]--;
    LogBeerRedeemed(msg.sender, _name);
  }

  function claimToken() public returns(bool) {
    require(balances[msg.sender] == 0);
    require(totalSupply < maxSupply);
    balances[msg.sender]++;
    totalSupply++;
    LogBeerClaimed(msg.sender);
  }

  function assignToken(address _owner) public onlyOwner returns(bool) {
    require(balances[_owner] == 0);
    require(totalSupply < maxSupply);
    balances[_owner]++;
    totalSupply++;
    LogBeerClaimed(_owner);
  }
}
