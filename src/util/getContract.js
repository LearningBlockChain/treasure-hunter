import Web3 from 'web3'
import {default as contract} from 'truffle-contract'
import treasure_artifacts from '../../build/contracts/Treasure.json'

let getContract = new Promise(function (resolve, reject) {
    var Treasure = contract(treasure_artifacts);
    Treasure.setProvider(web3.currentProvider);
    let address = "0x4e7e0c4d9a276641921abdaf541265e4522ed7a3"
    let treausreContractInstance = Treasure.at(address)
    resolve(treausreContractInstance)
})

export default getContract
