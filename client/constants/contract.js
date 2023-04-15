module.exports = {
    address: "0x9Bc754296600A51755996af578093e3886b91ffd",
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_pricePerUnitInWei",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "Solar_AmbiguousState",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "given",
            "type": "uint256"
          }
        ],
        "name": "Solar_InsufficientFunds",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "Solar_NoFallback",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "Solar_NoWithdraw",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "Solar_NotOwner",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "machineId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "enum Solar.State",
            "name": "state",
            "type": "uint8"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "currentUser",
            "type": "address"
          }
        ],
        "name": "MachineState",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "SolarBalanceSet",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "name": "buy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_machineId",
            "type": "uint256"
          }
        ],
        "name": "currentUser",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_machineId",
            "type": "uint256"
          }
        ],
        "name": "getMachineState",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "usedbalance",
            "type": "uint256"
          }
        ],
        "name": "setBalance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_machineId",
            "type": "uint256"
          }
        ],
        "name": "setMachine",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_pricePerUnitInWei",
            "type": "uint256"
          }
        ],
        "name": "setPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_machineId",
            "type": "uint256"
          }
        ],
        "name": "startMachine",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_machineId",
            "type": "uint256"
          }
        ],
        "name": "stopMachine",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ],
};
