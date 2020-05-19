var express = require('express');
var router = express.Router();
var sql = require('../database');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function (req, res) {
  console.log(JSON.stringify(req.body));
  var citylist = `INSERT INTO citylist (feels_like, humidity, pressure, temp, temp_max, temp_min, time, city)VALUES ('${req.body.feels_like}','${req.body.humidity}','${req.body.pressure}','${req.body.temp}','${req.body.temp_max}','${req.body.temp_min}','${req.body.time}','${req.body.city}')`;
  sql.query(citylist, function (err, result) {
    if (err) throw err;
    console.log(req.body);
    res.send('gotit');
  });
});
module.exports = router;
