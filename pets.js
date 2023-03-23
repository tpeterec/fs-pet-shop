let fs = require("fs");

let option = process.argv[2];

switch (option) {
  case "read":
    console.log("you selected read");
    fs.readFile("pets.json", "utf-8", (error, data) => {
      let pets = JSON.parse(data);
      console.log(pets);
    });
    break;
  case "create":
    console.log("you selected create");
    if (process.argv.length < 6) {
      console.log("Usage: node pets.js create AGE KIND NAME");
      break;
    }
    fs.readFile("pets.json", "utf-8", (error, data) => {
      let pets = JSON.parse(data);
      let age = process.argv[3];
      let kind = process.argv[4];
      let name = process.argv[5];
      let newObj = { age: age, kind: kind, name: name };
      pets.push(newObj);
      fs.writeFile("pets.json", JSON.stringify(pets), () => {
        console.log(newObj);
      });
    });
    break;
  case "update":
    console.log("you selected update");
    if (process.argv.length < 7) {
      console.log("Usage: node pets.js update INDEX AGE KIND NAME");
      break;
    }
    fs.readFile("pets.json", "utf-8", (error, data) => {
      let pets = JSON.parse(data);
      let age = process.argv[4];
      let kind = process.argv[5];
      let name = process.argv[6];
      let newObj = { age: age, kind: kind, name: name };
      let index = process.argv[3];
      pets[index] = newObj;
      fs.writeFile("pets.json", JSON.stringify(pets), () => {
        console.log(newObj);
      });
    });

    break;
  case "destroy":
    console.log("you selected destroy");
    if (process.argv.length < 4) {
      console.log("Usage: node pets.js destroy INDEX");
      break;
    }
    fs.readFile("pets.json", "utf-8", (error, data) => {
      let pets = JSON.parse(data);
      let index = process.argv[3];
      console.log(pets[index]);
      pets.splice(index, 1);
      fs.writeFile("pets.json", JSON.stringify(pets), () => {});
    });
    break;
  default:
    console.log(`usage: node pets.js [read | create | update | destroy]`);
    process.exit(1);
}
