const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // check the session
    console.log('commenttext:', req.body.comment_text);
    console.log('post:', req.body.post_id);
    console.log('user:', req.session.user_id);

    if (req.session.loggedIn) {
        Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                // use the id from the session
                user_id: req.session.user_id,
            })
            .then(dbCommentData => {
                console.log('\n \n dbCommentData ' + dbCommentData + '\n \n')
                res.json(dbCommentData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;