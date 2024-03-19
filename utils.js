const axios = require("axios");

async function fetchContent(url) {
    const resp = await axios.get(url);
    return resp.data;
}

function extractData(body, delimStart, delimEnd) {
    const startIdx = body.indexOf(delimStart);
    const endIdx = body.indexOf(delimEnd);
    return body.substring(startIdx + delimStart.length, endIdx).trim()
}

module.exports = { fetchContent, extractData };
