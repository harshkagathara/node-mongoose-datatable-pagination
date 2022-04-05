var express = require('express');
var router = express.Router();
var employee = require("../Controllers/Employee.controller");
router.get('/', employee.list)
router.post('/data', employee.dataList)

module.exports = router;
