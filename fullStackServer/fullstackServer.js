// set up dependencies
const dotenv = require("dotenv");
const express = require("express");

// Initialize dotenv
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

// Initialize PG
const { Pool } = require("pg");
const port = process.env.PORT || 3000;
const connectionString = process.env.STRING;
const pool = new Pool({
  connectionString: connectionString,
});

// API Routes
app.get("/api/pets", (req, res) => {
  pool
    .query("SELECT * FROM petshop_inventory")
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/pets/:petID", (req, res) => {
  pool
    .query(`SELECT * FROM petshop_inventory where id = $1`, [req.params.petID])
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("pet id not found");
      } else {
        res.send(result.rows);
      }
    });
});

app.post("/api/pets", (req, res) => {
  pool
    .query(
      `INSERT INTO petshop_inventory (age, kind, name) VALUES ($1, $2, $3) RETURNING *`,
      [req.body.age, req.body.kind, req.body.name]
    )
    .then((result) => {
      res.send(result.rows);
    });
});

app.patch("/api/pets/:petID", (req, res) => {
  let key = Object.keys(req.body)[0];
  let value = Object.values(req.body)[0];
  pool
    .query(
      `UPDATE petshop_inventory SET ${key} = $1 WHERE id = $2 RETURNING *`,
      [value, req.params.petID]
    )
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("pet id not found");
      } else {
        res.send(result.rows);
      }
    });
});

app.delete("/api/pets/:petID", (req, res) => {
  pool
    .query(`DELETE FROM petshop_inventory WHERE id = $1 RETURNING *`, [
      req.params.petID,
    ])
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send("pet id not found");
      } else {
        res.send(result.rows);
      }
    });
});

//listen on a port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
