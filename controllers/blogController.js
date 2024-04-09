const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

// get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({createdAt: -1})

  res.status(200).json(blogs)
}

// get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog'})
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({error: 'No such blog'})
  }

  res.status(200).json(blog)
}

// create a new blog
const createBlog = async (req, res) => {
  const {title, body} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!body) {
    emptyFields.push('body')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const blog = await Blog.create({ title, body })
    res.status(200).json(blog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such blog'})
  }

  const blog = await Blog.findOneAndDelete({_id: id})

  if(!blog) {
    return res.status(400).json({error: 'No such blog'})
  }

  res.status(200).json(blog)
}

// update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such blog'})
  }

  const blog = await Blog.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!blog) {
    return res.status(400).json({error: 'No such blog'})
  }

  const updatedBlog = await Blog.findById(id)

  res.status(200).json(updatedBlog)
}

module.exports = {
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  createBlog
}