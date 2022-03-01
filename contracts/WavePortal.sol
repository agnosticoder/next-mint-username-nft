//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{

    uint256 waveCount;
    uint256 private seed;
    mapping(address => uint256) public lastWavedAt;

    // data structure to store waver(signer) info
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
        uint256 balance;
        bool isGotEth;
    }

    Wave[] waves;

    event NewWave(address indexed from, uint256 timestamp, string message,uint256 contractFunds);

    constructor() payable {
        require(msg.value == 0.01 ether, 'Please send 0.01 ethers, no less no more');
        console.log('Runs only when we deploy to blockchain!');
        seed = (block.difficulty + block.timestamp) % 100;
        console.log(seed);
        // lastWavedAt[msg.sender] = block.timestamp;
        // console.log('========================');
        // console.log(lastWavedAt[msg.sender]);
        // console.log(15 minutes);
        // console.log('========================');
    }

    function wave(string memory message) public{
        waveCount = waveCount + 1;
        console.log('%s has waved', msg.sender);

        require(lastWavedAt[msg.sender] + 5 seconds <= block.timestamp, 'Please try after 20 seonds');


        seed = (block.difficulty + block.timestamp + seed) % 100;

        lastWavedAt[msg.sender] = block.timestamp;

        if(seed <= 50){
            waves.push(Wave(msg.sender, message, block.timestamp, (msg.sender).balance, true));
            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, 'Do not have enough balancce!');
            (bool success, ) = (msg.sender).call{value: prizeAmount}('');
            require(success, 'Failed to withdraw money from Contract');
        }else{
            waves.push(Wave(msg.sender, message, block.timestamp, (msg.sender).balance, false));
        }

        emit NewWave(msg.sender, block.timestamp, message, address(this).balance);
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }

    function getTotalWaves() public view returns (uint256){
        console.log(seed);
        console.log(block.timestamp);
        console.log(block.difficulty);
        return waveCount;
    }
}