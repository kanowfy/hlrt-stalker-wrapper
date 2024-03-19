const axios = require("axios");

async function fetchContent(url) {
    const resp = await axios.get(url);
    return resp.data;
}

function extractData(body, delimStart, delimEnd) {
    //console.log("parsing ", body, delimStart, delimEnd);
    const startIdx = body.indexOf(delimStart);
    if (startIdx == -1) {
        throw new Error("invalid start delimiter: " + delimStart);
    }

    const endIdx = body.indexOf(delimEnd);
    if (endIdx == -1) {
        throw new Error("invalid end delimiter: " + delimEnd);
    }
    return body.substring(startIdx + delimStart.length, endIdx).trim()
}

module.exports = { fetchContent, extractData };
