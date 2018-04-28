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
        }
    },
    actions: {
        registerWeb3 ({commit}) {
            getWeb3.then(result => {
                commit('registerWeb3Instance', result)
            }).catch(e => {
                console.log('error in action registerWeb3', e)
            })
        },
        getContractInstance ({commit}) {
            getContract.then(result => {
                commit('registerContractInstance', result)
            }).catch(e => console.log(e))
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
        }
    }
})
