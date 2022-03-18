//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./KittyFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketPlace is Ownable{
    KittyFactory private _kittyContract;
    struct Offer {
        address payable seller;
        uint256 price;
        uint256 tokenId;
        bool active;
    }
    Offer[] public offers;
    mapping(uint256 => Offer) tokenIdToOffer;
    mapping (uint256 => uint256) tokenIdToOfferId;

    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    constructor(address kittyContractAddress){
        setKittyContract(kittyContractAddress);
    }

    function setKittyContract(address kittyContractAddress) public onlyOwner{
        _kittyContract = KittyFactory(kittyContractAddress);
    }

    function getOffer(uint256 tokenId) public view returns (Offer memory) {
        Offer storage offer = tokenIdToOffer[tokenId];
        require(offer.seller != address(0), 'This token has not have any offer');
        return (offer);
    }

    function getAllTokenIdsOnSale() public view returns(uint256[] memory listOfTokenIds){
        uint256 totalOffers = offers.length;
        if (totalOffers == 0) {
            return new uint256[](0);
        }
        uint256 offerId;
        uint256 activeOffersCounter;
        while(offerId < totalOffers){
            if(offers[offerId].active == true){
                activeOffersCounter += 1;
            }
            offerId++;
        }
        uint256[] memory tokenIdsOnSale = new uint256[](activeOffersCounter);
        while(offerId < totalOffers){
            if(offers[offerId].active == true){
                tokenIdsOnSale[offerId] = offers[offerId].tokenId;
            }
            offerId++;
        }
        return tokenIdsOnSale;
    }

    function createOffer(uint256 price, uint256 tokenId) public{
        require(price >= 0.01 ether, "NFT price should be equal or greater than 0.01");
        require(_kittyContract.ownerOf(tokenId) == msg.sender, 'you are not the owner of the nft');
        //require(tokenIdToOffer[tokenId].active == false, 'Can not sell inactive offer');
        //_kittyContract.approve(address(this), tokenId);
        Offer memory offer = Offer({
            seller: payable(msg.sender),
            price: price,
            active: true,
            tokenId: tokenId
        });
        tokenIdToOffer[tokenId] = offer;
        tokenIdToOfferId[tokenId] = offers.length;
        offers.push(offer);
        emit MarketTransaction('Create offer', msg.sender, tokenId);
    }

    function removeOffer(uint256 tokenId) public {
        require(_kittyContract.ownerOf(tokenId) == msg.sender, 'you are not the owner of the nft');
        offers[tokenIdToOfferId[tokenId]].active = false;
        delete tokenIdToOffer[tokenIdToOfferId[tokenId]];
        delete tokenIdToOffer[tokenId];
        emit MarketTransaction('Remove offer', msg.sender, tokenId);
    }
}
