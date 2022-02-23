const Note = require('./note.model')

const getMany = async (req, res) => {
  try {
    const docs = await Note.find({}).exec()
    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: e })
  }
}

const createOne = async (req, res) => {
  try {
    const created = await Note.create({
      ...req.body
    })
    res.send({ data: created })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

const getOne = async (req, res) => {
  const id = req.params.id
  try {
    const doc = await Note.findOne({ _id: id }).exec()
    res.send({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const updateOne = async (req, res) => {
  try {
    const updatedDoc = await Note
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const removeOne = async (req, res) => {
  try {
    const removed = await Note.findOneAndRemove({
      _id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = {
  getMany,
  createOne,
  getOne,
  updateOne,
  removeOne
}
