const express = require("express");
const app = express();
const port = 5000;
const queries = require("./model/queries");
const db = require("./db/db");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

db.initDB();

app.get("/users/get", (req, res) => {
    queries.readAll().then((data) => {
        res.json({data: data});
    });
});

app.post("/users/add", (req, res) => {
    // let firma = req.body.firma;
    // console.log(firma);
    queries
        .createNew({
            first_name: "edber",
            last_name: "demiri",
            role: "Admin",
        })
        .then(() => {
            res.json({data: "Fi"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server errorr");
        });
});
//
// app.post("/deletecomp", (req, res) => {
//   let compdel = req.body.delfirma;
//   console.log(compdel);
//   queries.remove(compdel).then(() => {
//     res.json({ data: "deleted" });
//   });
// });
//
// app.post("/addcategory", (req, res) => {
//   let company_name = req.body.company_name;
//   let category = req.body.category.categoryName;
//   let subCategory = req.body.subCategory;
//   let subsubCategory = req.body.subsubCategory;
//   let categoryLife = req.body.categoryLife;
//   let current_datetime = new Date();
//   let formatted_date =
//     current_datetime.getDate() +
//     "-" +
//     (current_datetime.getMonth() + 1) +
//     "-" +
//     current_datetime.getFullYear();
//
//   queries
//     .createNewDoc({
//       company_name: company_name,
//       category: category,
//       subCategory: subCategory,
//       subsubCategory: subsubCategory,
//       date: formatted_date,
//       Life: categoryLife,
//     })
//     .then(res.send("data added succesfully"))
//     .catch((err) => {
//       res.send(err);
//     });
// });
//
// app.get("/getcategory", (req, res) => {
//   queries.readAllDoc().then((data) => {
//     res.json({ data: data });
//   });
// });
//
// app.post("/deletecategory", (req, res) => {
//   console.log(req.body);
//   queries.removeDoc(req.body.delfirma);
//   // .then((data) => {
//   //   res.json({ data: data });
//   // });
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
