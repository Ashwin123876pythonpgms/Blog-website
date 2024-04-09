const express = require('express')
const {
  getBlog,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController')

const router = express.Router()

// GET all blogs
router.get('/', getBlogs)

// GET a single blog
router.get('/:id', getBlog)

// POST a new blog
router.post('/', createBlog)

// DELETE a blog
router.delete('/:id', deleteBlog)

// UPDATE a blog
router.patch('/:id', updateBlog)

module.exports = router