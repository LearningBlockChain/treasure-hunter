import Web3 from 'web3'
import contract from '../../build/contracts/Treasure.json'

let getContract = new Promise(function (resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider)
    let address = "0xdb8c2c51566c2dc71d4aa1a334eb991ffb9221bf" // put your contract address when you migrate.
    let treausreContract = web3.eth.contract(contract["abi"])
    let treausreContractInstance = treausreContract.at(address)
    resolve(casinoContractInstance)
})

export default getContract
