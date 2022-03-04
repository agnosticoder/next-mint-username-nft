// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import 'hardhat/console.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import { Base64 } from "./libraries/Base64.sol";

contract MintNFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    mapping(string => string) public usernamesList;

    string baseSVG = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>@";

    constructor() ERC721('Username NFT', 'USER'){
        console.log('Get some Death Note, Pal!');
    }

    function mintUsernameNFT(string memory username) public{
        uint256 tokenId = _tokenIds.current();

        require(keccak256(abi.encodePacked(usernamesList[username])) != keccak256(abi.encodePacked(username)),'Username already exist');

        usernamesList[username] = username;

        _safeMint(msg.sender, tokenId);

        string memory finalSVG = string(abi.encodePacked(baseSVG, username, "</text></svg>"));

        string memory json = Base64.encode(bytes(
            string(abi.encodePacked(
                    '{"name": "',
                    // We set the title of our NFT as the generated word.
                    username,
                    '", "description": "Unique username in the entire world", "image": "data:image/svg+xml;base64,',
                    // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                    Base64.encode(bytes(finalSVG)),
                    '"}'
            ))
        ));

        string memory finalTokenURI = string(abi.encodePacked('data:application/json;base64,', json));

        _setTokenURI(tokenId, finalTokenURI);

        _tokenIds.increment();

        console.log("An NFT w/ ID %s has been minted to %s", tokenId, msg.sender);

        //going to use this for getting token id of newly created nft
        emit NewEpicNFTMinted(msg.sender, tokenId);
    }
}