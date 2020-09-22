const express     	 = require('express');
const app         	 = express();
const sequelize      = require('sequelize');
const bodyParser  	 = require('body-parser');
const db             = require('./models');
const cors           = require("cors");
db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.send('Hello to Product Api')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Using Routes
require("./routes/productRoutes")(app);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

//Server
const port = 8080;
app.listen(port, function(){
	console.log('The server has Started!');
});