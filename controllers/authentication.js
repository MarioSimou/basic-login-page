const Router = require('express-promise-router')
const router = new Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Login Page
router.get('/login', (req, res) => {
    res.render('authentication/login', {
        pageTitle: 'Login',
        messages : res.locals.messages,
        user: req.session.user
    })
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if(email && password){
        const user = await User.findOne({email: email});
        const isIdentical = user.validatePasswords(password, user.password);
        if(isIdentical){
            req.session.user = user;
            req.session.messages = { type: 'success', content : 'Successful login.'}
            res.redirect(302,'/blocks');
        }else{
            req.session.messages = { type: 'warning', content : 'Incorrect password. Try again.'}
            res.redirect(302, '/login');
        }
    }else{
        req.session.messages = { type: 'warning', content : 'Fill all the values.'}
        res.redirect(302, '/login');
    }
})

// Register Page
router.get('/register', (req, res) => {
    res.render('authentication/register', {
        pageTitle: 'Register',
        messages : res.locals.messages,
        user: req.session.user
    })
});

router.post('/register', async (req, res) => {
    const { name, email, password, cpassword } = req.body;
    if ((name && email && password && cpassword) && (password === cpassword)) {
        const user = await User.findOne({ name: name, email: email });
        if (user) {
            const isIdentical = user.validatePasswords(password, user.password);
            if (isIdentical) {
                req.session.messages = { type: 'warning', content : 'A user with the same cridentials already exists.'}
                res.redirect(302, '/register');
            } else {
                const hashedPassword = await bcrypt.hash(password, 12);
                const user = new User({
                    name: name,
                    email: email,
                    password: hashedPassword
                });
                user.save();
                req.session.user = user;
                req.session.messages = { type: 'success', content : 'Successful login.'}
                res.redirect(302, '/blocks');
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            });
            user.save();
            req.session.user = user;
            req.session.messages = { type: 'success', content : 'Successful login.'}
            res.redirect(302, '/blocks');
        }
    } else {
        req.session.messages = { type: 'warning', content : 'Fill all the available options or use similar passwords.'}
        res.redirect(302, '/register');
    }
});

// Logout
router.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect(302,'/');
    });
});


module.exports = router;
