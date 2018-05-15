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
        let address = "0xfaf2e7f19d09813898951f38eed4719197b8582e"
        let treasureContractInstance = Treasure.at(address)
        resolve(treasureContractInstance)
    }
})

export default getContract
