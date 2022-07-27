const tonMnemonic = require("tonweb-mnemonic");
const yargs = require('yargs');
const { toHexString } = require('./utils')

const argv = yargs.options('seed', {
    description: 'seed',
    alias: 's',
    type: 'array'
}).argv

Promise.resolve().then(async () => {
    const keyPair = await tonMnemonic.mnemonicToKeyPair(argv.seed);

    console.log('publicKey', toHexString(keyPair.publicKey))
    console.log('secretKey', toHexString(keyPair.secretKey))
})