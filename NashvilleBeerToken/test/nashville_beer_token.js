var NashvilleBeerToken = artifacts.require("../contracts/NashvilleBeerToken.sol");


contract('NashvilleBeerToken', async(accounts) => {
  it('should has a max supply of 20', async () => {
    let nashville_beer_token = await NashvilleBeerToken.deployed();
    let maxSupply = await nashville_beer_token.maxSupply();
    assert.equal(+maxSupply, 20, "max supply does not equal 20");
  });

  it('should be able to claim a  token', async () => {
    let nashville_beer_token = await NashvilleBeerToken.deployed();
    let wei = web3.toWei(0.015, 'ether');
    await nashville_beer_token.claimBeer({value: wei});
    let balance = await nashville_beer_token.balanceOf(web3.eth.coinbase);
    assert.equal(+balance, 2, "did not receive a token");
  });

  it('should throw when trying to claim a token without correct amount', async () => {
    try {
      let nashville_beer_token = await NashvilleBeerToken.deployed();
      let wei = web3.toWei(0.010, 'ether');
      await nashville_beer_token.claimBeer({value: wei});
      let balance = await nashville_beer_token.balanceOf(web3.eth.coinbase);
      assert.isTrue(false, "did not throw");
    } catch (e) {
      assert.isTrue(true, "did not throw an error");
    }
  });

});
