const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const userExtractor = require('../utils/middleware').userExtractor;


blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
    const { body, user } = request

    try {
        //responds with status 400 if there no title or url properties in the request
        if (!body.title || !body.url) {
            return response.status(400).json({ error: 'Title or URL is missing' })
        }

        //Adding likes property equeling to zero if it was not declared in the first place
        if (!body.likes) {
            body.likes = 0
        }

        const blog = new Blog({ ...body, user: user._id }) //Why here user.id and not user._id? Why there no error? Lookup later for better understanding!!!
        const savedBlog = await blog.save()
        const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 }) // in order the data about user was accessed by the client
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(populatedBlog)
    } catch(error) {
        next(error)
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    try {
        if (!blog) {
            return response.status(404).json({ error: 'Blog is not found' });
        }
        // Similarly look at user.id here too!!!
        if ( blog.user.toString() !== user.id ) {
            return response.status(403).json({ error: 'User is not authorized to delete this blog' })
        }

        user.blogs = user.blogs.filter(blogId => blogId.toString() !== blog.id.toString() )
        await user.save()

        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const newBlog = request.body

    try {
        const updatedItem = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' })
        const populatedBlog = await Blog.findById(updatedItem._id).populate('user', { username: 1, name: 1 })
        response.json(populatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter