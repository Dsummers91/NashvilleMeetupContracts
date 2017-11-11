pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/NashvilleBeerToken.sol";

contract TestNashvilleBeerToken {

  function testInitialBalanceUsingDeployedContract() {
    NashvilleBeerToken nbt = NashvilleBeerToken(DeployedAddresses.NashvilleBeerToken());

    uint expected = 0;

    Assert.equal(nbt.balanceOf(tx.origin), expected, "Owner should have 0 NashvilleBeerToken initially");
  }

}
