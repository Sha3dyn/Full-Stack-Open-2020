const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [ 
  { 
    _id: '5a422a851b54a676234d17f7', 
    title: 'React patterns', 
    author: 'Michael Chan', 
    url: 'https://reactpatterns.com/', 
    likes: 7,
    __v: 0 
  }, 
  { 
    _id: '5a422aa71b54a676234d17f8', 
    title: 'Go To Statement Considered Harmful', 
    author: 'Edsger W. Dijkstra', 
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 
    likes: 5, 
    __v: 0 
  }
]

beforeEach(async () => {
  await Blog.deleteMany({ })

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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
    expect(response.body).toHaveLength(initialBlogs.length)
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


afterAll(() => {
  mongoose.connection.close()
})