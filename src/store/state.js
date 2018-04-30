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
    contractAddress: null,
    treasure: {
        currentState: null,
        reward: null,
        minimalReward: null,
        bettingPrice: null,
        investPricePerAddress: null,
        winningNumberDigits: null,
    },
    user: {
        hunters: null,
        investors: null,
        balance: null
    }
}
export default state
