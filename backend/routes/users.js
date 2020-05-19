var express = require('express');
var router = express.Router();
var sql = require('../database');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function (req, res) {
  console.log(JSON.stringify(req.body));
  res.send("gotit");
});
module.exports = router;
