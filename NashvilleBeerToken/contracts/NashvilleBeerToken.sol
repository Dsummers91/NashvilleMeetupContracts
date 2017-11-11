pragma solidity ^0.4.18;

import 'tokens/HumanStandardToken.sol';

contract NashvilleBeerToken is HumanStandardToken {
    address public constant RECIPIENT = 0xB1384DfE8ac77a700F460C94352bdD47Dc0327eF;
    bytes32[] public claimedList;
    mapping(address => bytes32) names;
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
    
    /*
    * @note instead of burning the tokens we can identity each users address with a name
    * Or just transfer to the Nashville Ethereum Meetup Address
    */
    function registerName(bytes32 _name) {
        names[msg.sender] == _name;
    }

    function claimBeer() payable {
        require(msg.value == .015 ether);
        balances[msg.sender] += 1;
        totalSupply += 1;
        require(totalSupply <= maxSupply);
        RECIPIENT.transfer(msg.value);
        Transfer(address(0), msg.sender, 1);
        LogBeerBought(now, msg.sender);
    }

    function() payable {
        claimBeer();
    }
}