import {default as contract} from 'truffle-contract'
import treasure_artifacts from '../../build/contracts/Treasure.json'

let getContract = new Promise(function (resolve, reject) {
    let Treasure = contract(treasure_artifacts);
    Treasure.setProvider(web3.currentProvider);

    if (process.env.NODE_ENV === "development") {
    //     Treasure.deployed().then(function (instance) {
    //         resolve(instance);
    //     });
    // } else {
        let address = "0x92e56e9344e8fd1d91d2f5b8589f3d3412cab69e"
        let treasureContractInstance = Treasure.at(address)
        resolve(treasureContractInstance)
    }
})

export default getContract
