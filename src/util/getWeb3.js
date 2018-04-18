import {default as Web3} from 'web3';

let getWeb3 = new Promise(function (resolve, reject) {
    // Check for injected web3 (mist/metamask)
    // This is what I added for test.
    // Window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    var web3js = window.web3
    
    if (typeof web3js !== 'undefined') {
        var web3 = new Web3(web3js.currentProvider)
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    }

    resolve({
        web3 () {
            return web3
        }
    })
})
    .then(result => {
        return new Promise(function (resolve, reject) {
            result.web3().eth.getCoinbase((err, coinbase) => {
                if (err) {
                    reject(new Error('Unable to retrieve coinbase'))
                } else {
                    result = Object.assign({}, result, { coinbase })
                    resolve(result)
                }
            })
        })
    })
    .then(result => {
        return new Promise(function (resolve, reject) {
            console.log(result.web3().eth)
            result.web3().eth.getBalance(result.coinbase, (err, balance) => {
                if (err) {
                    reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
                } else {
                    result = Object.assign({}, result, { balance })
                    resolve(result)
                }
            })
        })
  })
  .then(result => {
      return new Promise(function (resolve, reject) {
          result.web3().eth.getAccounts(function (err, accounts) {
            if (err != null) {
              alert("There was an error fetching your accounts.");
              return;
            }
      
            if (accounts.length == 0) {
              alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
              return;
            }
            let hunter = accounts[0]
            result = Object.assign({}, result, { hunter })
            resolve(result)
        })
      })
  })

export default getWeb3
