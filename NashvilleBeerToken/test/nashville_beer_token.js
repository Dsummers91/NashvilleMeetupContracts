var NashvilleBeerToken = artifacts.require("../contracts/NashvilleBeerToken.sol");


contract('NashvilleBeerToken', async(accounts) => {
  it('should has a max supply of 20', async () => {
    let nashville_beer_token = await NashvilleBeerToken.deployed();
    let maxSupply = await nashville_beer_token.maxSupply();
    assert.equal(maxSupply, 20, "max supply does not equal 20");
  });

  it('should be able to claim a  token', async () => {
    let nashville_beer_token = await NashvilleBeerToken.deployed();
    await nashville_beer_token.claimToken();
    let balance = await nashville_beer_token.balanceOf(web3.eth.coinbase);
    assert.equal(+balance, 1, "did not receive a token");
  });

});
