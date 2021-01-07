const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({ })
  await Blog.insertMany(helper.initialBlogs)
})

describe('Get all blogs from database', () => {
  test('blogs are returned as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('return correct amount of blogs', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('specific blog is found within the returned ones', async() => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)
    expect(authors).toContain('Edsger W. Dijkstra')
  })

  test('blog contains id field', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('Post new blogs to database', () => {
  test('A valid blog can be added', async() => {
    const newBlog = {
      _id: '5a422b891b54a676234d17fa', 
      title: 'First class tests', 
      author: 'Robert C. Martin', 
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 
      likes: 10, 
      __v: 0 
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const author = response.body.map(r => r.author)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(author).toContain('Robert C. Martin')
  })

  test('New blog with empty likes field sets likes to zero', async() => {
    const newBlog = {
      _id: '5a422ba71b54a676234d17fb', 
      title: 'TDD harms architecture', 
      author: 'Robert C. Martin', 
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',  
      __v: 0  
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length - 1].likes).toBe(0)
  }) 

  test('Response status 400 if title and url are empty', async() => {
    const newBlog = {
      title: 'Type wars', 
      author: 'Robert C. Martin', 
      likes: 2, 
    }

    const anotherBlog = {
      author: 'Robert C. Martin', 
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 
      likes: 10, 
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(anotherBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async() => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('update of a blog', () => {
  test('update succeeds', async() => {
    const blog = {
      title: 'updated'
    }

    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    const titles = blogsAtEnd.body.map(r => r.title)

    expect(titles).toContain(blogToUpdate.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})