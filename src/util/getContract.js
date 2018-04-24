import Web3 from 'web3'
import {default as contract} from 'truffle-contract'
import treasure_artifacts from '../../build/contracts/Treasure.json'

let getContract = new Promise(function (resolve, reject) {
    var Treasure = contract(treasure_artifacts);
    Treasure.setProvider(web3.currentProvider);
    let address = "0xc19300eccda63bbedcfe4b741bdcd8f8cd371445" // put your contract address when you migrate.
    let treasureContractInstance = Treasure.at(address)
    resolve(treasureContractInstance)
})

export default getContract
