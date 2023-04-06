// set up dependencies
require("./fullStackServer/node_modules/dotenv/lib/main").config();
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
      res.status(200).send(pets);
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
      res.status(404).send("Not Found");
    }
    let singlePet = allPets[index];
    res.send(singlePet);
  });
});
// Post request creating a pet
app.post("/pets", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, data) => {
    let pets = JSON.parse(data);
    let age = req.body.age;
    let kind = req.body.kind;
    let name = req.body.name;
    let newObj = { age: age, kind: kind, name: name };
    pets.push(newObj);
    fs.writeFile("pets.json", JSON.stringify(pets), () => {
      console.log(newObj);
      res.send(newObj);
    });
  });
});

app.patch("/pets/:petId", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, data) => {
    let pets = JSON.parse(data);
    let key = Object.keys(req.body)[0];
    let value = Object.values(req.body)[0];
    let index = req.params.petId;
    pets[index][key] = value;
    fs.writeFile("pets.json", JSON.stringify(pets), () => {
      //console.log(newObj);
      res.send(pets[index]);
    });
  });
});

app.delete("/pets/:petId", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, data) => {
    let pets = JSON.parse(data);
    let index = req.params.petId;
    console.log(pets[index]);
    let response = pets[index];
    pets.splice(index, 1);
    fs.writeFile("pets.json", JSON.stringify(pets), () => {});
    res.send(response);
  });
});

//listen on a port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
