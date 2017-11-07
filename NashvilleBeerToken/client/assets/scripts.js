var web3;

if(typeof web3 == undefined) {
    web3 = new Web3("http://localhost:8545");
} else {
    web3 = new Web3(web3.currentProvider);
}


console.log(web3);