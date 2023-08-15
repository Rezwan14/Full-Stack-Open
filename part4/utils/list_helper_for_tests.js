const dummy = (blogs) => {
    if (Array.isArray(blogs)) {
        return 1;
    } else {
        return 1;
    }
}


const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((acc, blogObject) => acc + blogObject.likes, 0);
    return totalLikes;
}


const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favoriteBlog = blogs.reduce((prevBlog, currentBlog) => currentBlog.likes > prevBlog.likes ? currentBlog : prevBlog);

    return favoriteBlog

}


const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const grouppedBlogs = {}

    for (let i = 0; i < blogs.length; i++) {
        // If the author already exists, add his blog to the existing array
        if (grouppedBlogs[blogs[i].author]) {
            grouppedBlogs[blogs[i].author].push(blogs[i])
        } else { // If the author doesn't exist, create a new array with his first blog
            grouppedBlogs[blogs[i].author] = [blogs[i]]
        }
    }

    const [author, authorBlogs] = Object.entries(grouppedBlogs).reduce((prevItem, currentItem) => currentItem[1].length > prevItem[1].length ? currentItem : prevItem)

    return ( { author, blogs: authorBlogs.length })
}


const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const grouppedBlogs = {}

    for (let i = 0; i < blogs.length; i++) {
        // If the author already exists, add his blog to the existing array
        if (grouppedBlogs[blogs[i].author]) {
            grouppedBlogs[blogs[i].author].push(blogs[i])
        } else { // If the author doesn't exist, create a new array with his first blog
            grouppedBlogs[blogs[i].author] = [blogs[i]]
        }
    }

    const [author, authorBlogs] = Object.entries(grouppedBlogs).reduce((prevItem, currentItem) => totalLikes(currentItem[1]) > totalLikes(prevItem[1]) ? currentItem : prevItem)

    return ({ author, likes: totalLikes(authorBlogs) })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}