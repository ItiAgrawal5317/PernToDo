//create express app
//import express module using require function
const express = require("express");

// set express app
// create an object for express module
const app = express();
// set port number
const PORT = 5050;
const cors = require("cors");
const pool = require('./db')

//middleware
app.use(cors());
app.use(express.json());//req.body -- can get the access od client side data

// ROUTES //

// create a perndemo data

app.post("/demodatas", async (req, res) => {
    try {
        const { description } = req.body;
        const newDemoData = await pool.query(
            "INSERT INTO perndemotable (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newDemoData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all perndemodata

app.get("/demodatas", async (req, res) => {
    try {
        const alldemodatas = await pool.query("SELECT * FROM perndemotable");
        res.json(alldemodatas.rows)
    } catch (err) {
        console.error(err.message);
    }
});

// get a perndemodata

app.get("/demodatas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const demodata = await pool.query("SELECT * FROM perndemotable WHERE t_id = $1",
            [id]);

        res.json(demodata.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

//update a perndemodata

app.put("/demodatas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedemodata = await pool.query("UPDATE perndemotable SET description = $1 WHERE t_id = $2",
            [description, id]);

        res.json("Data was updated!")
    } catch (err) {
        console.error(err.message);
    }
});

//delete a perndemodata

app.delete("/demodatas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedemodata = await pool.query("DELETE FROM perndemotable WHERE t_id = $1",
            [id]);

        res.json("Data was Deleted!");
    } catch (err) {
        console.log(err.message);
    }
})

// make server to listen the request on specific port number using app.listen()
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server connected on ${PORT}`);
})