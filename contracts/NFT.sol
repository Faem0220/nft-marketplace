// contracts/Market.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

// Openzeppelin Contract Imports
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


// Se hereda contrato de ERC721URIStorage
contract NFT is ERC721URIStorage {
//-----------VARIABLES DE ESTADO--------------------------------------//
    //Usa el contrato Counters para llevar el estado de los tokenIds
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // address del contrato
    address contractAddress;
    
//-----------------CONSTRUCTOR------------------------//
    constructor(address marketplaceAddress) ERC721("Metaverse Tokens", "METT") {
        // Setea como address del contrado al address del marketplace que lo invoque
        contractAddress = marketplaceAddress;
    }
//-----------------------MÉTODOS--------------------------//
    // Función pública para crear token. recibe el tokenURI(IPFS) como pàrámetro a escribirse en memoria.
    function createToken(string memory tokenURI) public returns (uint) {
        //Incrementa el estado de los tokens y asigna el nuevo id a la variable newItemId
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}