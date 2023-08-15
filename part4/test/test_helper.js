const Blog = require('../models/blog');
const User = require('../models/user');

const initialPosts = [
    {
        "title": "Awesome text",
        "author": "Some James",
        "url": "https://wwww.google.com",
        "likes": 5
    },
    {
        "title": "Second awesome text",
        "author": "Mike James",
        "url": "https://wwww.google.com",
        "likes": 10
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ likes: 0 })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialPosts,
    nonExistingId,
    blogsInDb,
    usersInDb
}