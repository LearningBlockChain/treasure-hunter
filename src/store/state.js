let state = {
    web3: {
        web3Instance: null,
        clientAddress: null,
        clientBalance: null,
        reward: null,
        message: null,
        error: null
    },
    contractInstance: null,
    treasure: {
        investPricePerAddress: null,
        investExpireAt: null,
        currentState: null,
        reward: null
    }
}
export default state
