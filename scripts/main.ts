import {ethers} from 'hardhat';
import chalk from 'chalk';

export const main = async () => {
    const [owner, randomPerson] = await ethers.getSigners();

    //* This compiles the solidity code
    const waveContractFactory = await ethers.getContractFactory(
        'WavePortal'
    );

    //* This creates local blockchain can deploy the contract to the same
    //* This blockchain destroys after each run to save the computing resources
    const waveContract = await waveContractFactory.deploy();

    //? This is just a check, so only execute console.log when it is deployed
    await waveContract.deployed();

    //* getting contract and owners info
    console.log(chalk.bgGray('Contract is deployed to ', waveContract.address));
    console.log(chalk.bgMagenta('Contract is deployed by ', owner.address));

    //* Calling public functions on contract after deploying
    let waveCount = await waveContract.getTotalWaves();
    console.log({waveCount});
    let wave = await waveContract.wave();
    waveCount = await waveContract.getTotalWaves();
    await waveContract.connect(randomPerson).wave();
    console.log({ waveCount });
    waveCount = await waveContract.getTotalWaves();
    console.log({ waveCount });
    // console.log({ wave });
};
