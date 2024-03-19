const utils = require("./utils");

async function hlrt(url, tuple) {
    const body = await utils.fetchContent(url);

    const parsedTuple = parseTuple(tuple);
    console.log(parsedTuple);
    // remove head and tail
    const strippedBody = utils.extractData(body, parsedTuple.head, parsedTuple.tail);
    console.log("stripped body: ", strippedBody);

    const attributes = [];

    for (let i = 0; i < parsedTuple.delimiters.length; i = i + 2) {
        attributes.push(utils.extractData(strippedBody, parsedTuple.delimiters[i], parsedTuple.delimiters[i + 1]));
    }

    return {
        attributes: attributes
    };
}

// parseTuple takes a tuple string and return an array of delimiters
function parseTuple(tuple) {
    const tupArray = tuple.split(",");
    return {
        head: tupArray[0],
        tail: tupArray[1],
        delimiters: tupArray.slice(2)
    }
}

module.exports = hlrt
