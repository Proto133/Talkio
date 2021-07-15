const router = require('express').Router();
const errorJSON = require('../../utils/error.json')

router.get('/', (req, res) => {
    res.status(404).json(errorJSON);
    return;
})

module.exports = router