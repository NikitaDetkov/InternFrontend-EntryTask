import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decodedData(encoded) {
    const decoded = [];

    for (const encodedItem of encoded) {
        const elem = {};

        for (const key in encodedItem) {
            if (key.includes('Id') && key !== 'groupId' && encodedItem[key]) {
                elem[key] = translations[encodedItem[key]];
            } else {
                elem[key] = encodedItem[key];
            }
        }

        decoded.push(elem);
    } 

    return decoded;
}
const decoded = decodedData(encoded);


console.log(decoded)
