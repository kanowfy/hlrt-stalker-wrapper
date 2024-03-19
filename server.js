const express = require("express");
const path = require("path");
const hlrt = require("./hlrt");
const stalker = require("./stalker");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// We need URL, head, tail, one or more pair of delimiting tags
// Output will be the extracted data between each pair
app.post("/hlrt", async function (req, res) {
    /*
    console.log("got new req with url ", req.body.url);
    const resp = await axios.get(req.body.url);
    res.status(200).send(resp.data);
     */
    console.log("got new request with body: ", req.body);
    await hlrt(req.body.url, req.body.tuple)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err));
})

app.post("/stalker", async function (req, res) {
    console.log("got new request with body: ", req.body);
    await stalker(req.body)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})
