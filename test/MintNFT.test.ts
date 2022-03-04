import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory} from 'ethers';
import { ethers } from 'hardhat';
import { before } from 'mocha';

describe('MintNFT Unit Tests', function () {
    let MintNFTFactory:ContractFactory;
    let mintNFTContract:Contract;
    let owner:SignerWithAddress;

    before(async () => {
        [owner] = await ethers.getSigners();
        MintNFTFactory = await ethers.getContractFactory('MintNFT');
        mintNFTContract = await MintNFTFactory.deploy();
        await mintNFTContract.deployed();
    });

    it('should run the constructor and print to the terminal', async () => {
        console.log(owner.address);
        const t1 = await mintNFTContract.mintUsernameNFT('agnosticoder');
        await t1.wait();
        console.log({t1});
        mintNFTContract.mintUsernameNFT('satindergzs');
        const data = await mintNFTContract.usernamesList('agnosticoder');
        console.log({data});
    })
});