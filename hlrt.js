const utils = require("./utils");

async function hlrt(url, tuple) {
    const body = await utils.fetchContent(url);

    const parsedTuple = parseTuple(tuple);
    const strippedBody = utils.extractData(body, parsedTuple.head, parsedTuple.tail);

    const attributes = [];

    for (let i = 0; i < parsedTuple.delimiters.length; i = i + 2) {
        attributes.push(utils.extractData(strippedBody, parsedTuple.delimiters[i], parsedTuple.delimiters[i + 1]));
    }

    return {
        attributes: attributes
    };
}

function parseTuple(tuple) {
    const tupArray = tuple.split(",");
    return {
        head: tupArray[0],
        tail: tupArray[1],
        delimiters: tupArray.slice(2)
    }
}

module.exports = hlrt
