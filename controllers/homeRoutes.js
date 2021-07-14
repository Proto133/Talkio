const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        Post.findAll({
                attributes: [
                    'id',
                    'title',
                    'created_at',
                    'post_content'
                ],
                include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                }],
                include: [{
                    model: User,
                    attributes: ['id', 'username', 'github']
                }]

            })
            .then(dbPostData => {
                const posts = dbPostData.map(post => post.get({ plain: true }));
                res.render('homepage', {
                    // console.log('Post: \n \n', posts + ' \n \n')
                    posts,
                    loggedIn: req.session.loggedIn

                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        res.redirect('/login');
        return;
    }
});

router.get('/login', (req, res) => {
    console.log(req.session.loggedIn)
    console.log('req.session.user_id \n \n', req.session.user_id);
    if (req.session.loggedIn) {

        res.redirect('/dashboard');
    } else {

        res.render('login');
        return;
    }

});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'github']
                }
            }, {


                model: User,
                attributes: ['username', 'github']
            }]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });
            console.log('\n \n POST \n \n', post)
                // pass data to template
            res.render('singlePost', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;