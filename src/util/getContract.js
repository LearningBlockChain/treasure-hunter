import Web3 from 'web3'
import {default as contract} from 'truffle-contract'
import treasure_artifacts from '../../build/contracts/Treasure.json'

let getContract = new Promise(function (resolve, reject) {
    let Treasure = contract(treasure_artifacts);
    Treasure.setProvider(web3.currentProvider);
    let address = "0x9fed359a08ed803a597d12de059b24c3a0197b37"
    let treausreContractInstance = Treasure.at(address)
    resolve(treausreContractInstance)
})

export default getContract
