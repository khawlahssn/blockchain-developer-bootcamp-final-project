export const contractAddress = "0xF6d7133c6f2eCd081542198394594fDfEa1B10b7";

export const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_collector",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "recycler",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "balanceOfRecipient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "weightInKG",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum Recycle.State",
        "name": "statusOfRecyclable",
        "type": "uint8"
      }
    ],
    "name": "LogRecieved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "descrp",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "weightInKG",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum Recycle.State",
        "name": "statusOfRecyclable",
        "type": "uint8"
      }
    ],
    "name": "LogRecyclableAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "balanceOfRecipient",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum Recycle.State",
        "name": "statusOfRecyclable",
        "type": "uint8"
      }
    ],
    "name": "LogRewarded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "wasteCollector",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_itemDescription",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_cityCode",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_weight",
        "type": "uint256"
      }
    ],
    "name": "addRecyclable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recycler",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_weight",
        "type": "uint256"
      }
    ],
    "name": "requestReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recycler",
        "type": "address"
      }
    ],
    "name": "awardRecycler",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  }
];