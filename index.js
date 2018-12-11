const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const port = 3001;

/* Parse request objects into readable JSON format */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/getData", (req, res) => {
    let data = [{name: "Woodrow Wilson", 
                year: 1947, 
                number: 34
    }];
    res.send(data);
  });

app.use("/api", router);
app.listen(port, () => console.log(`Listening on port ${port}`));