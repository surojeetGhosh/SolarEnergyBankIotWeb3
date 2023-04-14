module.exports ={
    "address": "0x20496B557a898A6e28156aF0a6529d8e5DCbD95C",
    "abi": [
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
        { "inputs": [], "name": "Solar_AmbiguousState", "type": "error" },
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
        { "inputs": [], "name": "Solar_NoFallback", "type": "error" },
        { "inputs": [], "name": "Solar_NoWithdraw", "type": "error" },
        { "inputs": [], "name": "Solar_NotOwner", "type": "error" },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "SolarWithdraw",
            "type": "event"
        },
        { "stateMutability": "payable", "type": "fallback" },
        {
            "inputs": [],
            "name": "buy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                { "internalType": "uint256", "name": "", "type": "uint256" }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_machineId",
                    "type": "uint32"
                }
            ],
            "name": "getMachineState",
            "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPrice",
            "outputs": [
                { "internalType": "uint256", "name": "", "type": "uint256" }
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
                    "internalType": "uint32",
                    "name": "_machineId",
                    "type": "uint32"
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
                    "internalType": "uint32",
                    "name": "_machineState",
                    "type": "uint32"
                },
                { "internalType": "bool", "name": "state", "type": "bool" }
            ],
            "name": "setMachineState",
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
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        { "stateMutability": "payable", "type": "receive" }
    ]
}
