const express = require("express");
const bodyParser = require("body-parser");
// const axios = require("axios")

const app = express();
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = "";

app.use(bodyParser.json());

app.get("/webhook", (req, res) => {
    console.log("calling webhook");
    const mode = req.query["hub.mode"]
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if(mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("webhook verified successfully")
        res.status(200).send(challenge)
    } else {
        console.log("webhook verification confirmed")
        res.sendStatus(403)
    }
});

app.listen(PORT, function(err) {
    if (err) {
        console.log("Error in server setup")
    }else {
        console.log("ruuning on ", PORT)
    }
})