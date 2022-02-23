const { Router } = require('express')
const { getMany, createOne, getOne, updateOne, removeOne } = require('./note.controller')

const router = Router()

// /api/notes
router
  .route('/')
  .get(getMany)
  .post(createOne)

// /api/note/:id
router
  .route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(removeOne)

module.exports = router
