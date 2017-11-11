NashvilleBeerToken-finished contains deployed implementation that is not an ERC-20 Token

It is deployed on mainnet at address 0xe63a46c4019eb0fc86ab90dc0b1e782fe8883aa6

[Check it out on etherscan](https://etherscan.io/address/0xe63a46c4019eb0fc86ab90dc0b1e782fe8883aa6)

NashvilleBeerToken is the code that was created during the meetup, it is not finished and should not be used in production


The steps we used to create the ERC20 Nashville Beer Token

1. Install truffle globally
    ```
    npm install -g truffle
    ```

2. Create NashvilleBeerToken.sol inside the "contracts" folder

3. Install the contracts folders from EthPM (ethereum package manager)

4. Inside NashvilleBeerToken.sol import "tokens/HumanStandardToken.sol"
    

    This gives us all the ERC-20 functionality that makes in an ERC20 token


6. In order to migrate add a  file to migrations folder and include constructor parameters
    ```
    deployer.deploy(NashvilleBeerToken, 1e18, "NashBeer", 18, "NBT");
    ```


From then on we created the contract and added the extra functionality neccessary for our needs

## Migrating
run `truffle develop`

then ``migrate``

This will give you list of addressed and transaction hashes. Now you can interact with the contract within truffle develop by

With an output of ``NashvilleBeerToken: 0x345ca3e014aaf5dca488057592ee47305d9b3e10``

We can now do this within truffle's develop console
```
NBT = NashvilleBeerToken.at("0x345ca3e014aaf5dca488057592ee47305d9b3e10")
NBT.name()
```

should give you the name that you created in migrations folder



TODO: In order to make this produciton ready create test cases in the test folder, and make sure there arent any bugs/attack vectors within the contract.
