const app = require("express")();
const quotes = require("./quotes");
const qarr = quotes.quotes;
var port = process.env.PORT || 3000;

app.get("/quotes/random", (req, res) => {
    const random = Math.floor(Math.random() * quotes.quotes.length);
    res.json(quotes.quotes[random]);
});


app.all("*", (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

const https = require("https");
https.get(
    "https://the-office-quotes.herokuapp.com/quotes/random",
    (res) => {
        console.log(res.statusCode);
        let data = "";
        res.on("data", (chunk) => {
            // Data is being received in chunks, we add it to the data variable to save it
            data += chunk;
        });
        res.on("end", () => {
            // all data has been received, now we can parse it and are done
            var parsedData = JSON.parse(data);
            if (res.statusCode === 404) {
                alert("City Not Found");
            } else {
                console.log(parsedData);
            }
        });
    }
);

app.get("/quotes/:n", (req, res) => {
    var n = req.params.n;
    const len = quotes.quotes.length;
    // let qarr = quotes.quotes;

    n = n > len ? len : n;

    var random = Math.floor(Math.random() * quotes.quotes.length);
    var array = [];
    for (var i = 0; i < n; i++) {
        array.push(quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]);
        random = (random + 1) % len;
    }
    res.json(array);
});




app.get("/twss", (req, res) => {
    const arr = qarr.filter(q => q.type == `That's what she said`)
    res.json(arr);
});

app.listen(port, (req, res) => {
    console.log("The server is running on port 3000");
});