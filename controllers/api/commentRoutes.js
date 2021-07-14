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
    console.log('\n \n Logged In: ' + req.session.loggedIn + '\n \n')

    console.log('\n \n Comment: ' + req.body.comment_text + '\n \n')

    console.log('\n \n Post ID: ' + req.body.post_id + '\n \n')

    console.log('\n \n User ID: ' + req.body.user_id + '\n \n')
    if (res.session.loggedIn) {
        Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                // use the id from the session
                user_id: req.session.user_id,
            })
            .then(dbCommentData => {
                console.log('\n \n dbCommentData \n \n', dbCommentData + '\n \n')
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