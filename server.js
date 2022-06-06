///////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();


///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("I'm working YAY!");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));