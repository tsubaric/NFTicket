const Dotenv = require('dotenv-webpack');

module.exports = {
    experiments: {
        topLevelAwait: true
    },
    plugins: [
        new Dotenv()
    ],
};
