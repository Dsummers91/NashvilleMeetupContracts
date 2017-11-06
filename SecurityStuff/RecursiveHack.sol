pragma solidity ^0.4.15;

// There are two severe things wrong with this contract
contract DaoHack {
  mapping(address => uint256) balances;

  function withdraw(uint256 amount) {
    msg.sender.send(amount);
    balances[msg.sender] -= amount;
  }
}