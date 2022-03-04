import {ethers} from 'hardhat';
import chalk from 'chalk';

export const main = async () => {
    const [owner, randomPerson] = await ethers.getSigners();

    const MintNFTFacotory = await ethers.getContractFactory('MintNFT');
    const mintNFTContract = await MintNFTFacotory.deploy();
    await mintNFTContract.deployed();

    //* getting contract and owners info
    console.log(chalk.bgGray('Contract is deployed to ', mintNFTContract.address));
    console.log(chalk.bgMagenta('Contract is deployed by ', owner.address));

    //* Calling public functions on contract after deploying
    const t1 = await mintNFTContract.mintUsernameNFT('agnosticoder');
    await t1.wait();
    const t2 = await mintNFTContract.connect(randomPerson).mintUsernameNFT('agnosticoder');
    await t2.wait();
};
