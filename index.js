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
      if(req.params.data){
        res.send([{"President":"A", "Birthday":1, "Death day":"...", "Death place":"ok"}]);
      }
      res.send(jsonObj);
    });
  });

  router.post("/getAscending", (req, res) => {
      let jsonObj = req.body["data"];
        jsonObj = jsonObj.sort(function(a, b) {
          let x = a["President"]; 
          let y = b["President"];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      res.send(jsonObj);
  });

  router.post("/getDescending", (req, res) => {
    let jsonObj = req.body["data"];
      jsonObj = jsonObj.sort(function(a, b) {
        let x = a["President"]; 
        let y = b["President"];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      });
    res.send(jsonObj);
});

// router.get("/getDescending", (req, res) => {
//   return presidentsObj.sort(function(a, b) {
//     let x = a["President"]; 
//     let y = b["President"];
//     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//   });
// });

app.use("/api", router);
app.listen(port, () => console.log(`Listening on port ${port}`));