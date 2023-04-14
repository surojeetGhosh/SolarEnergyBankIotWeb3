const {getNamedAccounts, ethers} = require("hardhat");

async function main() {

    const {deployer} = await getNamedAccounts();

    const Store = await ethers.getContract("Solar", deployer);
    const status = await Store.getMachineState("1");
    console.log(status.toString());
}


main().catch(err => {
    console.log(err);
})
