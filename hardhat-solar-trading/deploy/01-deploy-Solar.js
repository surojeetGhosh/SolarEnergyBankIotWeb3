const {ethers} = require("hardhat");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();     
    const contract = await deploy("Solar", {
        from: deployer,
        args: [ethers.utils.parseUnits("272136077158440", "wei")],
        log: true,
        waitConfirmations: 1
    })
    log("-----------------------------------------")
}

// 0x20496B557a898A6e28156aF0a6529d8e5DCbD95C