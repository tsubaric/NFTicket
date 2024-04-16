require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const COMPILER_SETTINGS = {
    optimizer: {
        enabled: true,
        runs: 200,
    },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.7",
                COMPILER_SETTINGS,

            },
        ],
    },
    networks: {
        hardhat : {
            blockGasLimit: 100000000000
        },
        localhost: {
            chainId: 31337,
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [process.env.DEV_PRIVATE_KEY],
            chainId: 80000,
        }
    }
};
