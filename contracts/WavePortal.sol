//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{

    uint256 waveCount;

    constructor(){
        console.log('Pal, are you ready to learn web3, are you that guy?');
    }

    function wave() public{
        waveCount = waveCount + 1;
        console.log('%s has waved', msg.sender);
    }

    function getTotalWaves() public view returns (uint256){
        console.log('we have %d total waves', waveCount);
        return waveCount;
    }
}