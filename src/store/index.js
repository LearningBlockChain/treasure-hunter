import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import getContract from '../util/getContract'

Vue.use(Vuex)
export const store = new Vuex.Store({
    strict: true,
    state,
    mutations: {
        registerWeb3Instance (state, payload) {
            console.log('registerWeb3instance Mutation being executed', payload)
            let result = payload
            let web3Wallet = state.web3
            web3Wallet.coinbase = result.coinbase
            web3Wallet.clientAddress = result.hunter
            web3Wallet.clientBalance = parseInt(result.balance, 10)
            web3Wallet.web3Instance = result.web3
            state.web3 = web3Wallet
        },
        registerContractInstance (state, payload) {
            console.log('Treasure contract instance: ', payload)
            state.contractInstance = () => payload
        },
        setReward(state, payload) {
            state.treasure.reward = parseInt(payload, 10)
        },
        setInvestExpireAt(state, payload) {
            state.treasure.investExpireAt = parseInt(payload, 10)
        },
        setCurrentState(state, payload) {
            state.treasure.currentState = parseInt(payload, 10)
        },
        setInvestPrice(state, payload) {
            state.treasure.investPricePerAddress = parseInt(payload, 10)
        },
        setHunters(state, payload) {
            state.user.hunters = payload
        },
        setInvestors(state, payload) {
            state.user.investors = payload
        },
        setWinningNumberDigits(state, payload) {
            state.treasure.winningNumberDigits = parseInt(payload, 10)
        },
        setInvestPeriod(state, payload) {
            state.treasure.investPeriod = parseInt(payload, 10)
        },
        setMinimumWinningReward(state, payload) {
            state.treasure.minimalReward = parseInt(payload, 10)
        },
        setContractAddress(state, payload) {
            state.contractAddress = payload
        }
    },
    actions: {
        /* Initial Functions */
        registerWeb3 ({commit}) {
            getWeb3.then(result => {
                commit('registerWeb3Instance', result)
            }).catch(e => {
                console.log('error in action registerWeb3', e)
            })
        },
        /* Common Functions */
        getContractInstance ({commit}) {
            return new Promise((resolve, reject) => {
                getContract.then(result => {
                    commit('registerContractInstance', result)
                    resolve(result)
                }).catch(e => console.log(e))
            })
        },
        getReward ({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getReward.call().then(result => {
                    commit('setReward', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getInvestExpireAt ({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getInvestExpireAt.call().then((result) => {
                    commit('setInvestExpireAt', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getCurrentState ({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getState.call().then((result) => {
                    commit('setCurrentState', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getInvestPrice ({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getInvestPrice.call().then((result) => {
                    commit('setInvestPrice', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getHunters({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getHunterAddresses.call().then((result) => {
                    commit('setHunters', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getInvestors({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getInvestorAddresses.call().then((result) => {
                    commit('setInvestors', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getWinningNumberDigits({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getWinningNumberDigits.call().then((result) => {
                    commit('setWinningNumberDigits', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getInvestPeriod({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getInvestPeriod.call().then((result) => {
                    commit('setInvestPeriod', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getMinimumWinningReward({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getMinimumWinningReward.call().then((result) => {
                    commit('**', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        getContractAddress({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().getContractAddress.call().then((result) => {
                    commit('**', result)
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        setMinimumWinningReward({commit}, minimalReward) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().setMinimumWinningReward(minimalReward).then((result) => {
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        setWinningNumberDigits({commit}, digits) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().setWinningNumberDigits(digits).then((result) => {
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        setInvestPricePerAddress({commit}, price) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().setInvestPricePerAddress(price).then((result) => {
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        setInvestPeriod({commit}, seconds) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().setInvestPeriod(seconds).then((result) => {
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        invest({commit}) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().invest({
                    gas: 300000,
                    value: state.treasure.investPricePerAddress,
                    from: state.web3.clientAddress
                }).then((result) => {
                    resolve(result)
                }).catch(e => reject(e))
            })
        },
        bet({commit}, guessNumber) {
            return new Promise((resolve, reject) => {
                if (state.contractInstance == null)
                    return
                state.contractInstance().bet(guessNumber, {
                    gas: 300000,
                    value: state.treasure.investPricePerAddress, //TODO: 이 곳에 현재 배팅 값을 가져 온 후에 그 값으르 넣어줘야 함
                    from: state.web3.clientAddress
                }).then((result) => {
                    resolve(result)
                }).catch(e => reject(e))
            })
        }
    }
})
