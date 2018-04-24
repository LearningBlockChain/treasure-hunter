// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
    //contracts_build_directory: "./src/util/contracts",
    networks: {
        development: {
            //host: 'http://cd972f11.ap.ngrok.io',
            //port: 80,
            host: '127.0.0.1',
            port: 8545,
            network_id: '*' // Match any network id
        }
    }
}
