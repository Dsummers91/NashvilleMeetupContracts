var NashvilleBeerToken = artifacts.require("./NashvilleBeerToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NashvilleBeerToken, 20);
};
