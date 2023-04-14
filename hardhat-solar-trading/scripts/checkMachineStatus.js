const {getNamedAccounts, ethers} = require("hardhat");

async function main() {

    const {deployer} = await getNamedAccounts();

    const Store = await ethers.getContract("Solar", deployer);
    
    //  (await Store.setMachine("1")).wait(1);
    const status = await Store.getMachineState("1");
    console.log(status.toString());
}


main().catch(err => {
    console.log(err);
})
