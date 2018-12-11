const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const csvFilePath = ('./presidents.csv');
const csv=require('csvtojson');

const port = 3001;

var presidentsObj;

/* Parse request objects into readable JSON format */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/getData", (req, res) => {
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
      presidentsObj = jsonObj;
      res.send(jsonObj);
    });
  });

router.get("/getAscending", (req, res) => {
    return presidentsObj.sort(function(a, b) {
      let x = a["President"]; 
      let y = b["President"];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
});

router.get("/getDescending", (req, res) => {
  return presidentsObj.sort(function(a, b) {
    let x = a["President"]; 
    let y = b["President"];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
});

app.use("/api", router);
app.listen(port, () => console.log(`Listening on port ${port}`));