import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decodedData(encoded) {
    const decoded = [];
    for (let ind in encoded) {
        const elem = {};
        for (let key in encoded[ind]) {
            if ( key.includes('Id') && key !== 'groupId' &&  encoded[ind][key] !== null) {
                elem[key] = translations[encoded[ind][key]];
            } else {
                elem[key] = encoded[ind][key];
            }
        }
        decoded.push(elem);
    } 

    return decoded;
}
const decoded = decodedData(encoded);


console.log(decoded)
