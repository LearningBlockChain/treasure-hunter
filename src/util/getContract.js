import Web3 from 'web3'
import {default as contract} from 'truffle-contract'
import treasure_artifacts from '../../build/contracts/Treasure.json'

let getContract = new Promise(function (resolve, reject) {
    let Treasure = contract(treasure_artifacts);
    Treasure.setProvider(web3.currentProvider);
    let address = "0xdb8c2c51566c2dc71d4aa1a334eb991ffb9221bf"
    let treausreContractInstance = Treasure.at(address)
    resolve(treausreContractInstance)
})

export default getContract
