const listHelper = require('../utils/list_helper_for_tests')

// Tests for dummy function
test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


// Tests for totalLikes function
describe('total likes', () => {

    test('of empty list is zero', () => {
        const blogs = [];

        expect(listHelper.totalLikes(blogs)).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ];

        expect(listHelper.totalLikes(blogs)).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f1',
                title: 'Some Text',
                author: 'Edsger W. D.',
                url: 'http://www.u.arizona.edu/',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f4',
                title: 'Something',
                author: 'Edsger W.W.',
                url: 'http://www.u.arizona.edu/',
                likes: 10,
                __v: 0
            }
        ];

        expect(listHelper.totalLikes(blogs)).toBe(15)
    })
})


// Tests for favoriteBlog
describe('favorite blog', () => {

    test('of empty list is null', () => {
        const blogs = [];

        expect(listHelper.favoriteBlog(blogs)).toBe(null)
    })

    test('when list has only one blog equals to that blog', () => {
        const blogs = [
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5,
            }
        ];

        expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0])
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                title: 'Some Text',
                author: 'Edsger W. D.',
                likes: 5,
            },
            {
                title: 'Something',
                author: 'Edsger W.W.',
                likes: 10,
            }
        ];

        expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[1])
    })
})


// Tests for mostBlogs
describe('largest amount of blogs', () => {

    test('of empty list is null', () => {
        const blogs = [];

        expect(listHelper.mostBlogs(blogs)).toBe(null)
    })

    test('of one blog equals to the author of that blog with a number of blogs which equels 1', () => {
        const blogs = [
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5,
            }
        ];

        expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                title: 'Go To Statement',
                author: 'Edsger W. Dijkstra',
                likes: 4,
            },
            {
                title: 'Go Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 3,
            },
            {
                title: 'Go To',
                author: 'Mike Distra',
                likes: 5,
            }
        ];

        expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
    })
})


// Tests for mostLikes
describe('largest amount of likes', () => {

    test('of empty list is null', () => {
        const blogs = [];

        expect(listHelper.mostLikes(blogs)).toBe(null)
    })

    test('of one blog equals to the author of that blog with a number of likes found there', () => {
        const blogs = [
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5,
            }
        ];

        expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                title: 'Go To Statement',
                author: 'Edsger W. Dijkstra',
                likes: 10,
            },
            {
                title: 'Go Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 3,
            },
            {
                title: 'Go To',
                author: 'Mike Distra',
                likes: 15,
            }
        ];

        expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Mike Distra', likes: 15 })
    })
})