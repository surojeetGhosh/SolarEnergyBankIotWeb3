const {getNamedAccounts, ethers} = require("hardhat");

async function main() {

    const {deployer} = await getNamedAccounts();

    const Store = await ethers.getContract("Solar", deployer);
    
    //  (await Store.setMachine("0")).wait(1);
    // (await Store.stopMachine("1")).wait(1);
    const status = await Store.getMachineState("1");
    const currentUser = await Store.currentUser("1");
    console.log(status.toString(), " ", currentUser.toString());
}


main().catch(err => {
    console.log(err);
})
