# Final Project - Recycling Reward System
## App Link
https://khawlahssn.github.io/blockchain-developer-bootcamp-final-project/

## Screencast
https://www.youtube.com/watch?v=i6o3O2WV0mE

## Ethereum Address for Certification
0x8D7544695d6aBDb17891180F53cD821a27dbFff0

## Running the project locally
### Pre-requisties
- Node.js >= 14
- Truffle and Ganache
- Yarn

### Contracts
- `yarn install`
- Development network is Ganache running locally on port `7545` and has a network id of `5777`
- `truffle develop`
- To deploy the contract on Ganache: `migrate --development`
- To run the tests: `test`
- To deploy the contract to a testnet, please change the address passed to the contructor in the `migrations` directory to any address of your own to be able to make the reward requests 

### Front-end
- cd `client`
- `yarn install`
- `yarn start` launches a react app that can viewed in your browser at `http://localhost:3000`

## Project Structure
```
.
├── ./README.md
├── ./avoiding_common_attacks.md
├── ./build
│   └── ./build/contracts
├── ./client
│   ├── ./client/README.md
│   ├── ./client/build
│   ├── ./client/node_modules
│   ├── ./client/package.json
│   ├── ./client/public
│   ├── ./client/src
│   └── ./client/yarn.lock
├── ./contracts
│   ├── ./contracts/Migrations.sol
│   └── ./contracts/Recycle.sol
├── ./deployed_address.txt
├── ./design_pattern_decisions.md
├── ./log.txt
├── ./migrations
│   ├── ./migrations/1_initial_migration.js
│   └── ./migrations/2_deploy_contract.js
├── ./node_modules
├── ./package.json
├── ./test
│   ├── ./test/exceptionsHelpers.js
│   └── ./test/recycle.test.js
├── ./truffle-config.js
└── ./yarn.lock
```

## Transaction Flow
1. User submits a description of their item and specify their location
2. Based on the drop-off location given to the user, the assigned e-waste collector will recieve the item, measures it, and submits a request to the admin
3. The user's and collector's measurements should be equal after rounding
4. Admin/authority recevies the request from the collector then rewards the recycler with `0.001 ether`
## Project Description
E-waste consists of electrical and electronic equipments (EEEs) that have been discarded by their owners because they're either unwanted or have reached the end of their useful life. According to the [UN](https://www.unep.org/news-and-stories/press-release/un-report-time-seize-opportunity-tackle-challenge-e-waste), the world produces about 50 million tonnes a year of e-waste and only 20% is formally recycled with 80% either ending up in landfill or being informally recycled. EEEs are made of components that have large amounts of heavy metals and toxic substances such as lead and mercury which is why it is so damaging to the environment and has a negative effect on human health. The cheapest recyling option for many countries is to send e-waste overseas to developing countires, hence putting the workers health at risk.

The objective of the project is to incentivise people to recycle their e-waste, this can be done as follows:

1. A goverment authority (for example. ministry of climate change & environment) will be responsible for creating, running, and maintaining the network in addition to writing the smart contracts
2. Consumer will put up their e-waste for recycling which will then be collected by a waste collector
3. The waste collector delivers the items to a recycling facility which then confirms the transaction, weighs the equipments, and depending on the weight the consumer will be rewarded with an x-amount of ether. Also, they can recieve an NFT appreciation card for their contribution in protecting the environment if they for example put up over 100 items for recycling
4. The GA must approve the transfer of eth before it gets sent to the consumer's address

## Environment variables for deploying on a testnet
- ACCOUNT_MNEMONIC=
- RINKEBY_ENDPOINT=

## To-do features
- `rewardCard()` that will mint an [NFT appreciation card](https://ipfs.io/ipfs/QmRB5cAYVmYy7dgmyYyNWaKwZ7kt7fGRyW5CTtfHaqDYo5?filename=thankyou-card-nft.png) for when over a 100 items are recycled 
- Instead of having the `amountToAward` fixed, it checks the current value of around `10$` in ether
