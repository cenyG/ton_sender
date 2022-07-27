require('dotenv').config()

const TonWeb = require("tonweb");
const yargs = require("yargs");
const tonMnemonic = require("tonweb-mnemonic");
const BN = TonWeb.utils.BN;

const { toUint8Array, delay } = require('./utils')

const isMainnet = process.env.NETWORK === 'main'

const argv = yargs
    .options('seed', {
        description: 'seed',
        alias: 's',
        type: 'array'
    })
    .options('secretKey', {
        description: 'secretKey',
        alias: 'sk',
        type: 'string'
    })
    .options('amount', {
        description: 'amount',
        alias: 'a',
        type: 'string'
    })
    .options('toAddress', {
        description: 'toAddress',
        alias: 'to',
        type: 'string'
    })
    .options('payload', {
        description: 'payload',
        alias: 'p',
        type: 'string'
    })
    .argv

const tonweb = isMainnet ?
    new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC')) :
    new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));

async function getWallet(publicKey) {
    const WalletClass = tonweb.wallet.all.v3R2;

    return new WalletClass(tonweb.provider, {
        publicKey
    });
}

async function getKeyPair() {
    let keyPair

    if (argv.secretKey) {
        const ab = toUint8Array(argv.secretKey)
        keyPair = TonWeb.utils.nacl.sign.keyPair.fromSecretKey(ab)
    } else if (argv.seed) {
        keyPair = await tonMnemonic.mnemonicToKeyPair(argv.seed)
    } else {
        throw new Error("no --seed or --secretKey")
    }

    return keyPair
}

async function doWithdraw(amount, toAddress, payload = undefined) {
    amount = TonWeb.utils.toNano(amount)

    const keyPair = await getKeyPair()
    const wallet = await getWallet(keyPair.publicKey)

    const myAddress = await wallet.getAddress()
    await delay(1111)

    const balance = new BN(await tonweb.provider.getBalance(myAddress.toString()))
    await delay(1111)

    if (amount.gte(balance)) {
        console.log('there is not enough balance to process the withdrawal')
        return false;
    }


    const info = await tonweb.provider.getAddressInfo(toAddress);
    await delay(1111)
    if (info.state !== 'active') {
        toAddress = new TonWeb.utils.Address(toAddress).toString(true, true, false);
    }

    const seqno = await (wallet.methods.seqno().call()) || 0
    await delay(1111)

    const transfer = await wallet.methods.transfer({
        secretKey: keyPair.secretKey,
        seqno,
        toAddress,
        amount,
        payload
    });
    await delay(1111)


    await transfer.send();
}

Promise.resolve().then(async() => {
    const {
        amount,
        toAddress,
        payload
    } = argv

    try {
        await doWithdraw(amount, toAddress, payload)
        console.log('withdraw success')
    } catch (e){
        console.error(e)
    }
})