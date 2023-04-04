// set up dependencies
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// handles requests w/ routes
app.get("/pets", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, pets) => {
    if (error) {
      res.err(error);
    } else {
      // res.json(JSON.parse(pets));
      res.status(200).send(pets);
      // res.status(200);
      // res.end();
    }
  });
});

app.get("/pets/:petId", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, pets) => {
    if (error) {
      res.err(error);
    }
    let allPets = JSON.parse(pets);
    let index = req.params.petId;
    if (index < 0 || index > allPets.length || isNaN(index)) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.write("Not Found");
      res.end();
    }
    let singlePet = allPets[index];
    console.log(singlePet);
    res.json(singlePet);
    res.status(200);
    res.end();
  });
});

//listen on a port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
