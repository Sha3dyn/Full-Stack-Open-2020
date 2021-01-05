const dummy = (blogs) => {
    // ...
    return 1
}
  
const totalLikes = (blogs) => {
    var result = blogs.map(blog => blog.likes).reduce((acc, blog) => blog + acc, 0)
    return result
}

const favoriteBlog = (blogs) => {
    blogsCopy = [...blogs]
    
    var sorted = blogsCopy.sort((a, b) => b.likes - a.likes)
    var result = blogs.length > 0 ? sorted[0] : 0

    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}