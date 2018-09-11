const router = require('express').Router()

router.get('/:id', async (req,res,next) => {
  try {
    const id = req.params.id;
    const book = await findById(id)
    res.send(book);
  } catch (error) {
    next(error);
  }
})

module.exports = router
