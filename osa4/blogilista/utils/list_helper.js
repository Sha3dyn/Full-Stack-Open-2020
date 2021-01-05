const dummy = (blogs) => {
    // ...
    return 1
}
  
const totalLikes = (blogs) => {
    var result = blogs.map(blog => blog.likes).reduce((acc, blog) => blog + acc, 0)
    console.log(result)
    return result
}

module.exports = {
    dummy,
    totalLikes
}