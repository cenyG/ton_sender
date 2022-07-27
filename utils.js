function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

function toUint8Array(str) {
    const buf = new ArrayBuffer(str.length/2);
    const bufView = new Uint8Array(buf);

    let tmpChar = ''
    let buffCounter = 0
    for (let i=0; i<str.length; i++) {
        if (i !== 0 && i % 2 === 0) {
            bufView[buffCounter] = parseInt(tmpChar, 16)
            tmpChar = ''
            buffCounter += 1
        }
        tmpChar += str[i]
    }

    if (tmpChar !== '') {
        bufView[buffCounter] = parseInt(tmpChar, 16)
    }

    return bufView;
}

async function delay(ms) {
    return new Promise((h)=>setTimeout(h, ms))
}

module.exports = {
    toHexString,
    toUint8Array,
    delay
}