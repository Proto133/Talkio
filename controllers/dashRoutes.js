const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    console.log('\n \n req.session.userId \n \n', req.session.user_id);
    Post.findAll({
            where: {
                // use the ID from the session
                user_id: req.session.user_id
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


                model: User,
                attributes: ['username']
            }]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('dashboard', {
                posts,
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.get('/edit/:id', (req, res) => {
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


                model: User,
                attributes: ['username']
            }]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/create/', (req, res) => {
    Post.findAll({
            where: {
                // use the ID from the session
                user_id: req.session.user_id
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


                model: User,
                attributes: ['username']
            }]
        })
        .then(dbPostData => {
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('write-post', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;