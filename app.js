const express = require('express');
const mongoose = require("mongoose");
const JWT_SECRET = "ydhdhnnbczwqpypqd575g";
MONGOURI = "mongodb+srv://jayant4412:jayant4412@cluster0.yrjo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 5000;

const app = express();

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("connected to mongos yeah");
});
mongoose.connection.on("error", (err) => {
    console.log("error aali jk :", err);
});



require("./models/user");
app.use(express.json());


app.use(require("./routes/authentication"));


app.listen(PORT, () => {
    console.log("it is running on port", PORT);
})