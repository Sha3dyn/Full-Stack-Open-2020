const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  })
  
  if(blog.title !== undefined && blog.url !== undefined) {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } else {
    response.status(400).end()
  }
  
})

blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.json(blog)
})

module.exports = blogsRouter