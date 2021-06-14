const express = require("express");
const app = express();
const port = 5000;
const queries = require("./model/queries");
const db = require("./db/db");
const bodyParser = require("body-parser");
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

app.use(cors());
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

db.initDB();

app.get("/users/get", (req, res) => {
    queries.readAllUsers().then((data) => {
        res.json({data: data});
    });
});

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})


app.post("/users/add", (req, res) => {
    // let firma = req.body.firma;
    // console.log(firma);
    queries
        .createNewUsers({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        })
        .then(() => {
            res.json({data: "User Created Successfully"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server errorr");
        });
});

app.post("/users/edit", (req, res) => {
    queries.updateUsers(req.body.user_name, {})
});

app.post("/partners/add", (req, res) => {
    let data = {
        company_name: req.body.company_name,
        phone_number: req.body.phone_number
    }
    queries.createNewPartner(data)
        .then(() => {
            res.json({data: "Partner Created Successfully"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server errorr");
        });
});

app.post("/partners/delete/partner", (req, res) => {

    console.log("--"+JSON.stringify(req.body.id))
    queries.removePartner(req.body.id)
        .then(() => {
            res.json({data: "Partner Deleted Successfully"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server errorr");
        });
});

app.post("/partners/edit", (req, res) => {
    queries.updatePartner()
});

app.get("/partners/get", (req, res) => {
    queries.readAllPartner().then((data) => {
        res.json({data: data});
    });
});

app.get("/products/get", (req, res) => {
    queries.readAllProduct().then((data) => {
        res.json({data: data});
    });
});

app.post("/products/get/byimei", (req, res) => {
    queries.getByImeiProduct(req.body.imei).then((data) => {
        console.log(data)
        res.json({data: data});
    });
});

app.post("/products/get/byname", (req, res) => {
    queries.getByNameProduct(req.body.name).then((data) => {
        console.log(data)
        res.json({data: data});
    });
});
app.post("/products/get/bypartner", (req, res) => {
    queries.getByPartnerProduct(req.body.partnername).then((data) => {
        console.log(data)
        res.json({data: data});
    });
});

app.post("/products/add/company", (req, res) => {
    console.log(req.body)
    let data = {
        product_name: req.body.product_name,
        imei: req.body.imei,
        category: req.body.category,
        date: req.body.date,
        buyer: req.body.buyer,
        buying_price: req.body.buying_price,
        selling_price: req.body.selling_price,
        facture_number: req.body.facture_number
    }
    queries.createNewProduct(data)
        .then((data) => {
            console.log("123",data)
            res.json({data: "Product Created Successfully"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server errorr");
        });
});

app.post("/product/add/person", (req, res) => {
    let data = {
        product_name: req.body.product_name,
        imei: req.body.imei,
        category: req.body.category,
        date: Date.now(),
        buying_price: req.body.buying_price,
        selling_price: req.body.selling_price,
        name_surname: req.body.name_surname,
        tel_num: req.body.tel_num,
        id_number: req.body.id_number,
    }
    console.log("--"+JSON.stringify(data))
    queries.createNewProduct(data)
        .then(() => {
            res.json({data: "Product Created Successfully"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({msg:"internal server errorr", err:err});
        });
});

app.post("/product/delete/product", (req, res) => {

    console.log("--"+JSON.stringify(req.body))
    queries.removeProduct(req.body.id)
        .then(() => {
            res.json({data: "Product Deleted Successfully"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server errorr");
        });
});

app.post("/product/edit", (req, res) => {

});

app.post("/sales/delete/product", (req, res) => {

    console.log("--"+JSON.stringify(req.body.id))
    queries.removeSale(req.body.id)
        .then(() => {
            res.json({data: "Product Deleted Successfully"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server errorr");
        });
});

app.get("/sales/get", (req, res) => {
    queries.readAllSale().then((data) => {
        res.json({data: data});
    });
});

app.post("/sales/add", (req, res) => {
    let inputs = req.body;
    delete inputs[0]._id;
    console.log(inputs[0])
    queries.createNewSale(inputs[0]).then(()=>
        res.status(200)
    ).catch((err)=>{
        console.log(err)

        res.status(500).send("internal server errorr");
    })
});

app.post("/sales/edit", (req, res) => {

});


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
