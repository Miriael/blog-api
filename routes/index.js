var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
}));

module.exports = router;
