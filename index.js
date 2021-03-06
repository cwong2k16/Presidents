/* Main Back-end Server Logic */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const csvFilePath = ('./presidents.csv');
const csv=require('csvtojson');
const path=require('path');

const port = process.env.PORT || 5000;

/* Parse request objects into readable JSON format */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/build')));

/* Parse out the president CSV file into JSON format, which sends to the front-end */
router.get("/getData", (req, res) => {
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
      res.send(jsonObj);
    });
  });

  /* Parse out the president object from front-end, sort it by ascending order, then return it to front-end */
  router.post("/getAscending", (req, res) => {
      let jsonObj = req.body["data"];
        jsonObj = jsonObj.sort(function(a, b) {
          let x = a["President"]; 
          let y = b["President"];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      res.send(jsonObj);
  });

  /* Parse out the president object from front-end, sort it by descending order, then return it to front-end */
  router.post("/getDescending", (req, res) => {
    let jsonObj = req.body["data"];
      jsonObj = jsonObj.sort(function(a, b) {
        let x = a["President"]; 
        let y = b["President"];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      });
    res.send(jsonObj);
});

/* "/api" will be the root of the routes in this app */
app.use("/api", router);

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, '/client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));