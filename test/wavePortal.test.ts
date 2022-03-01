import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory} from 'ethers';
import { ethers } from 'hardhat';
import { before } from 'mocha';

describe('WavePortal Unit Test', function () {
    let wavePortalContractFactory:ContractFactory;
    let wavePortalContract:Contract;
    let owner:SignerWithAddress;

    before(async () => {
        [owner] = await ethers.getSigners();
        wavePortalContractFactory = await ethers.getContractFactory('WavePortal');
        wavePortalContract = await wavePortalContractFactory.deploy({value: ethers.utils.parseEther('0.01')});
        await wavePortalContract.deployed();
    });

    it('Should return all waves', async () => {
        const waveTxn = await wavePortalContract.wave('Hello!');
        waveTxn.wait();

        const totalWaves = await wavePortalContract.getAllWaves();
        console.log('Contract Address: ', wavePortalContract.address);
        console.log("Owner's Address: ", owner.address);
        console.log(totalWaves[0]);
        expect(totalWaves[0].waver).to.equal(owner.address);
        expect(totalWaves[0].message).to.equal('Hello!');
    });

    it('Should return total number of waves', async () => {
        const waveCount = await wavePortalContract.getTotalWaves();
        console.log(waveCount);
        expect(waveCount).to.equal(1);
    });

    it('contract should hold correct amount of ether', async () => {
        const currentAmount = await ethers.provider.getBalance(wavePortalContract.address)
        const formatedCurrentAmount = ethers.utils.formatEther(currentAmount);
        console.log({formatedCurrentAmount});
        const signerAmount = await owner.getBalance();
        console.log(ethers.utils.formatEther(signerAmount));
        expect(Number(formatedCurrentAmount)).satisfy((num:number) => {
            if(num === .0099 || num ===.01) return true
        })
    })
});