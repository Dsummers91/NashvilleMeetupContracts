var web3;
var abi = [{ "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "claimToken", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }], "name": "assignToken", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "bytes32" }], "name": "redeemBeer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "maxSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_maxSupply", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }], "name": "LogBeerClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": false, "name": "name", "type": "bytes32" }], "name": "LogBeerRedeemed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }], "name": "LogTransfer", "type": "event" }];
var address = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';

if (typeof web3 == undefined) {
    web3 = new Web3("http://localhost:9545");
} else {
    // If not on Mainnet, and not on localhost, use external node
    if (web3.version.network != 1 && !window.location.origin.match(/localhost/gi)[0]) {
        web3 = new Web3(web3.currentProvider);
        $('#error-message').text("Not Connected to Mainnet on local web3, using a remote node")
    } else {
        web3 = new Web3(web3.currentProvider);
    }
}
var contract = web3.eth.contract(abi).at(address);

init();

function init() {
    getTokenSupply();
    getTotalClaimed();
    getUserBalance();
    getCurrentAddress();
}

function getTokenSupply() {
    contract.maxSupply((err, res) => {
        $('#token-supply-count').text(+res);
    })
}

function getTotalClaimed() {
    contract.totalSupply((err, res) => {
        $('#token-claimed-count').text(+res);
    })
}

function getCurrentAddress() {
    $('#user-address').text(web3.eth.coinbase);
}

function getUserBalance() {
    contract.balanceOf(web3.eth.coinbase, (err, res) => {
        $('#user-balance').text(+res);
    })
}


/** CLICK EVENTS **/

$('#claim-button').on('click', () => {
    contract.claimToken({ from: web3.eth.coinbase }, (err, res) => {
        console.log(res)
    })
})

$('#transfer-button').on('click', () => {
    var address = $('#transfer-address').val();
    var amount = $('#transfer-amount').val();
    contract.transfer(address, amount, { from: web3.eth.coinbase }, (err, res) => {
        console.log(res)
    })
})

$('#redeem-button').on('click', () => {
    var name = $('#redeem-name').val();
    contract.redeemBeer(name, { from: web3.eth.coinbase, gas: 52000 }, (err, res) => {
        console.log(res)
    })
})

/** EVENTS */

contract.allEvents({ fromBlock: 0, toBlock: 'latest' }).watch((err, res) => {
    if (res.event === 'LogBeerClaimed') $('#claimed-log').append('<tr><td scope="row"><small>' + res.args.owner + '</small></td><td>' + new Date() + '</td></tr>');
    if (res.event === 'LogTransfer') $('#transferred-log').append('<tr><td scope="row"><small>' + res.args.to + '</small></td><td><small>' + res.args.from + '</small></td><td>' + new Date() + '</td></tr>');
    if (res.event === 'LogBeerRedeemed') $('#redeemed-log').append('<tr><td scope="row"><small>' + web3.toUtf8(res.args.name) + '</small></td><td>' + new Date() + '</td></tr>');
    init();
})