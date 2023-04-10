require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.17",
  networks: {
    "ganache": {
      url: "http://127.0.0.1:7545",
      accounts: [
        "c63433915da7d7f39a2ff3994c826758284aba106d5a268f91c8c884a738c1db",
        "dd11eeb2d4e04fb18e0b84ddb9a47924d5791bfedb28e328df08ad3aa7ac9876",
        "38d99ce06668c7e32867799d25fef7c598c95154ac370538115fe1e31eb08b89",

      ],
      blockConfirmations: 1
    },
    "sepolia": {
      url: process.env.RPC_URL_2,
      accounts: [
        process.env.PRIVATE_KEY_2
      ],
      chainId: 11155111,
      blockConfirmations: 6,
    }
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
  },
  etherscan: {
    apiKey: process.env.API
  }
};
