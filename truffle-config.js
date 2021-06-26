const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*'
        },
        inf_Crowdfunding_rinkeby: {
            network_id: 4,
            gasPrice: 100000000000,
            provider: new HDWalletProvider(
                fs.readFileSync('c:\\Users\\ADMIN\\Desktop\\secret.env', 'utf-8'),
                'https://rinkeby.infura.io/v3/d1b8249f92a5448aadedc0d5d1e45cd1'
            )
        }
    },
    mocha: {},
    compilers: {
        solc: {
            settings: {
                optimizer: {
                    enabled: false,
                    runs: 200
                },
                evmVersion: 'byzantium'
            }
        }
    },
    db: {
        enabled: false
    },
    contracts_build_directory: './compiledContracts'
};
