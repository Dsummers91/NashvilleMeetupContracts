pragma solidity ^0.4.18;

import 'tokens/HumanStandardToken.sol';

contract NashvilleBeerToken is HumanStandardToken {
    address public constant RECIPIENT = 0x627306090abab3a6e1400e9345bc60c78a8bef57;
    bytes32[] public claimedList;
    uint256 public maxSupply;

    event LogBeerBought(uint date, address owner);

    function NashvilleBeerToken(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        uint256 _maxSupply
        ) 
        HumanStandardToken(_initialAmount, _tokenName, _decimalUnits, _tokenSymbol) 
        {
            maxSupply = _maxSupply;
        }

    function buyToken() payable {
        require(msg.value == .2 ether);
        balances[msg.sender] += 1 * 10 ** 18;
        totalSupply += 1 * 10 ** 18;
        require(totalSupply <= maxSupply);
        RECIPIENT.transfer(msg.value);
        LogBeerBought(now, msg.sender);
    }
    
    function claimBeer(bytes32 _name) {
        require(balances[msg.sender] >= 1 * 10 ** 18);
        balances[msg.sender] -= 1 * 10 ** 18;
        totalSupply -= 1 * 10 ** 18;
        claimedList.push(_name);
    }
}