var http = require("http");
const fs = require("fs");
var port = process.env.PORT || 8000;

var server = http.createServer(function (req, res) {
  var index = req.url.slice(6);

  if (req.url === "/pets") {
    fs.readFile("pets.json", "utf-8", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
        res.writeHead(200, { "content-type": "application/json" });
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === `/pets/${index}`) {
    fs.readFile("pets.json", "utf-8", (error, data) => {
      var pets = JSON.parse(data);
      var singlePet = JSON.stringify(pets[index]);
      if (error) {
        console.log(error);
      } else if (typeof singlePet === "undefined" || Number(index) < 0) {
        console.log(index);
        res.writeHead(404, { "content-type": "text/plain" });
        res.write("Not Found");
        res.end();
      } else {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(singlePet);
        res.end();
      }
    });
  }
});

server.listen(port, function () {
  console.log("Listening on port", port);
});

// const petRegExp = /^\/pets\/(.*)$/;
// [`RegExp.prototype.test()`]["test"][`String.prototype.match()`]["match"];
