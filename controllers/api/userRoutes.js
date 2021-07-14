const router = require('express').Router();
const { User } = require('../../models')
const bcrypt = require('bcrypt');
const saltRounds = 5;


//GET user
router.get('/', async(req, res) => {
        User.findAll({
                attributes: ['name', 'github', 'username', 'email', 'password']
            })
            .then(userInfo => res.json(userInfo))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    })
    // CREATE new user
router.post('/', async(req, res) => {
    try {
        const dbUserData = await User.create({
            name: req.body.name,
            github: req.body.github,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        // Set up sessions with the 'loggedIn' variable
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async(req, res) => {
    const email = req.body.email;
    // const password = req.body.password;

    try {
        const dbUserData = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        // const comparison = await bcrypt.compare(password, dbUserData[0].password);

        // if (!comparison) {
        //     res
        //         .status(400)
        //         .json({ message: 'Incorrect email or password. Please try again!' });
        //     return;
        // }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.github = dbUserData.github;
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: dbUserData.username, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    // When the user logs out, the session is destroyed
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;