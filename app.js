const express = require("express")
const https = require("https")
const { response } = require("express")
const bodyparser = require("body-parser")

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")


})
app.post("/", (req, res) => {
    // console.log("the request is recive")
    // console.log(req.body.cityName);
    const querry = req.body.cityName
    const apikey = "99ad6f44381676caec08914d026a5a32"
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&appid=" + apikey + "&units=metric"
    https.get(URL, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            // console.log(data);
            const wheatherdata = JSON.parse(data);
            // console.log(wheatherdata);
            const temp = wheatherdata.main.temp;
            const discription = wheatherdata.weather[0].description
            // console.log(discription)
            // console.log(temp);
            res.write("<h1>the temprechur at " + querry + " is " + temp + "degree celcius</h1>")
            res.write("<p>the wether discript is " + discription + "</p>")
        })
    })
})



app.listen(3000, () => {
    console.log("server is started at port 3000")
})