require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
    version: "0.8.17",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        },
    },
    networks: {
        hardhat : {
            blockGasLimit: 100000000000
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [process.env.DEV_PRIVATE_KEY]
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [process.env.DEV_PRIVATE_KEY]
        }
    }
};
