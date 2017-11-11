var NashvilleBeerToken = artifacts.require("./NashvilleBeerToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NashvilleBeerToken, 1e18, "NashBeer", 18, "NBT");
};

