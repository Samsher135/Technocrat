const express = require('express');
const path = require('path');
const port = process.env.PORT || 7000 ;
const hbs = require('hbs');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = "mongodb+srv://All_users_25:test@cluster0.mjn0g.mongodb.net/Db_Tables?retryWrites=true&w=majority";

MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    console.log("database connected");
    if (err) throw err;
    dbo = db.db("Db_Tables");
    });


const app = express();

// const staticPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");

// middleware for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) =>{
    try {
        dbo.collection("master_tbl").find({}, { projection: { _id: 0, pfm_code: 1, pfn_name: 1 } }).toArray(function(err, result) {
        if (err) throw err;
        result1 = result;
        });
    res.render("index", {
        pfn_name : result1
    });
    // pfm_code1 = req.body.pfm_code;
    // if(pfm_code1){
    // res.redirect("/Data");
    // }
    }catch(err){
        res.send(err);
    }
});

app.post("/getJson", (req, res) =>{
    // pfm_code1 = req.body.pfm_code;
    // if(pfm_code1){
    // res.redirect("/Data");
    // }
    var query = { pfm_code: req.body.pfm_code };
    dbo.collection("data_tbl").find(query).toArray(function(err, result) {
      if (err) throw err;
      let JSONDATA = JSON.stringify(result);
      console.log(JSONDATA);
      res.send(JSONDATA);
    });
});


app.listen(port, () => {
    console.log(`listening to ${port}`);
  })