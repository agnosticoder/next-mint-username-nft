import { ethers } from "hardhat";

const main = async () => {
    const [deployer, buddy] = await ethers.getSigners();
    console.log('Address of pal the deployer', deployer.address);
    // console.log('Address of pal\'s buddy', buddy.address);
    console.log('Pal got this much eth in his account: ', await (await deployer.getBalance()).toString());

    const waveContractFactory = await ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log('Wave Contract is deployed at ', waveContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();