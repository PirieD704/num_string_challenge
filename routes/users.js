var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/gotData', function(req, res, next) {
  res.render('index', { title: "Horizon" });
});

module.exports = router;
