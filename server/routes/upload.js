const { log } = require('debug');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:img', function(req, res) {
    let img = req.params.img;
    res.sendFile( `upload/${img}`,{ root: '../server' });
});
module.exports = router;