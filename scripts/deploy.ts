import { ethers } from "hardhat";

const main = async () => {
    const MintNFTFacotory = await ethers.getContractFactory('MintNFT');
    const mintNFTContract = await MintNFTFacotory.deploy();
    await mintNFTContract.deployed();

    console.log('Shinigami is coming at ', mintNFTContract.address);

    //* Calling public functions on contract after deploying
    const t1 = await mintNFTContract.mintUsernameNFT('agnosticoder');
    await t1.wait();
    console.log('#1 NFT Minted')
    const t2 = await mintNFTContract.mintUsernameNFT('satindergzs');
    await t2.wait();
    console.log('#2 NFT Minted')
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