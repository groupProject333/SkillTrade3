const express = require('express')
const router = express.Router()
const listController = require('../../controllers/listController');

router.post('/', listController.create);
router.get('/', listController.findAll)
router.put('/search/', listController.findByTags)



module.exports = router;