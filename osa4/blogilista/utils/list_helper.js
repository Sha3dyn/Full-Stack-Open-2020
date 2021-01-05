var _ = require('lodash')

const dummy = (blogs) => {
  // ...
  console.log(blogs)
  return 1
}
  
const totalLikes = (blogs) => {
  var result = blogs.map(blog => blog.likes).reduce((acc, blog) => blog + acc, 0)
  return result
}

const favoriteBlog = (blogs) => {
  var blogsCopy = [...blogs]
  var sorted = blogsCopy.sort((a, b) => b.likes - a.likes)

  return blogs.length > 0 ? sorted[0] : null
}

const mostBlogs = (blogs) => {
  var result = _.chain(_.map(blogs, 'author'))
    .countBy()
    .entries()
    .maxBy(_.last)
    .value()

  return blogs.length > 0 ? result : null
}

const mostLikes = (blogs) => {
  var result = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      'likes':blogs.reduce((a, b) => {
        return a + b.likes
      }, 0)
    }))
    .maxBy('likes')

  return blogs.length > 0 ? result : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}