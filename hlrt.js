const utils = require("./utils");

/*
<html>
<title>Countries in Australia (Continent)</title>
<body>
<b>Countries in Australia(Continent)</b><p>
<b>Australia</b> <i>61</i><br>
<b>East Timor</b> <i>670</i><br>
<b>Papua New Guinea</b> <i>675</i><br>
<hr>
<b>Copyright easycalls.com</b>
 */

async function hlrt(url, tuple) {
    const body = await utils.fetchContent(url);
    const body1 = `
<html>
<title>Countries in Australia (Continent)</title>
<body>
<b>Countries in Australia(Continent)</b><p>
<b>Australia</b> <i>61</i><br>
<b>East Timor</b> <i>670</i><br>
<b>Papua New Guinea</b> <i>675</i><br>
<hr>
<b>Copyright easycalls.com</b>

    `

    const parsedTuple = parseTuple(tuple);
    let strippedBody = utils.extractData(body, parsedTuple.head, parsedTuple.tail);
    console.log(parsedTuple);

    const attributes = [];

    for (let i = 0; i < parsedTuple.delimiters.length; i = i + 2) {
        console.log("stripped:", strippedBody);
        attributes.push(utils.extractData(strippedBody, parsedTuple.delimiters[i], parsedTuple.delimiters[i + 1]));
        strippedBody = strippedBody.substring(strippedBody.indexOf(parsedTuple.delimiters[i + 1]) + parsedTuple.delimiters[i + 1].length);
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
