import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { nftaddress, nftmarketaddress } from '/home/faem/nft-marketplace/config.js'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'


const ItemDetail = () => {
 
  const [nft, setNft] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()
  const { token } = (router.query)

  useEffect(() => {
    loadNFT()
  }, [])

  async function loadNFT() {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress,Market.abi,provider)
    const data = await marketContract.fetchAllMarketItems()

    const item = await Promise.resolve(data[token])
    const tokenUri = await tokenContract.tokenURI(item.tokenId)
    const meta = await axios.get(tokenUri)
    let price = ethers.utils.formatUnits(item.price.toString(), 'ether')
    let itemData = {
        price,
        tokenId: item.tokenId.toNumber(),
        seller: item.seller,
        owner: item.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
    setNft(itemData)
    setLoadingState('loaded')


  }

  return (
      <div>
        <img src={nft.image}> 
        </img>
        <p>price: {nft.price}</p>
        <p>tokenId: {nft.tokenId}</p>
        <p>seller: {nft.seller}</p>
        <p>owner: {nft.owner}</p>
        <p>name: {nft.name}</p>
        <p>description: {nft.description}</p>

       
      </div>
      )
    
}

export default ItemDetail