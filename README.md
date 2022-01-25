# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help

Run project:
1. npx hardhat compile ---> Will create artifacts and smart contracts address
2. npx hardhat node ---> Run a hardhat node
3. npx hardhat run scripts/deploy.js --network localhost --> Will deploy the contracts on localhost node
4. npm run dev ---> Run the frontend app


NOTE: Errors on number of transactions (Nonce too high. Expected nonce to be 0 but got 4. Note that transactions cant be queued when automining. Its beacause the node expects tx number 0 and get the history of the wallet.
). Fix with setting reset account on metamask.
```
