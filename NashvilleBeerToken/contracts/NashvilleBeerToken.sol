pragma solidity ^0.4.18;

import 'tokens/HumanStandardToken.sol';

contract NashvilleBeerToken is HumanStandardToken {
    address public constant RECIPIENT = 0xB1384DfE8ac77a700F460C94352bdD47Dc0327eF;
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
    
    function claimBeer(bytes32 _name) {
        require(balances[msg.sender] >= 1 * 10 ** 18);
        balances[msg.sender] -= 1 * 10 ** 18;
        totalSupply -= 1 * 10 ** 18;
        claimedList.push(_name);
    }

    function() payable {
        require(msg.value == .2 ether);
        balances[msg.sender] += 1 * 10 ** 18;
        totalSupply += 1 * 10 ** 18;
        require(totalSupply <= maxSupply);
        RECIPIENT.transfer(msg.value);
        LogBeerBought(now, msg.sender);
    }
}