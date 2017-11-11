var NashvilleBeerToken = artifacts.require("./NashvilleBeerToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NashvilleBeerToken, 1, "NashBeer", 0, "NBT", 20);
};

