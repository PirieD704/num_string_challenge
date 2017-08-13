const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const { catchErrors } = require('../handlers/errorHandlers');

console.log(controller)
console.log(controller.homePage)
/* GET home page. */
router.get('/', catchErrors(controller.homePage));
router.post('/gotData', catchErrors(controller.gotData));

module.exports = router;
