var express = require('express');
var router = express.Router();
var sql = require('../database');
/* GET users listing. */
router.get('/:cityname', function (req, res, next) {
  sql.query(`SELECT * FROM citylist WHERE city = '${req.params.cityname}'`, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});


router.post('/:cityname', function (req, res) {
  console.log(JSON.stringify(req.body));
  var citylist = `UPDATE  citylist
  SET feels_like='${req.body.feels_like}',
  humidity= '${req.body.humidity}',
  pressure= '${req.body.pressure}',
  temp= '${req.body.temp}',
  temp_max= '${req.body.temp_max}',
  temp_min= '${req.body.temp_min}',
  time= '${req.body.time}',
  city= '${req.body.city}'
  WHERE city= '${req.params.cityname}'`;
  sql.query(citylist, function (err, result) {
    if (err) throw err;
    console.log(req.body);
    res.send('gotit');
  });
});
module.exports = router;
