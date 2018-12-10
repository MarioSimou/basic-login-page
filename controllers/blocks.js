const Router = require('express-promise-router');
const router = new Router();
const isAuthenticated = require('../util/isAuthenticated');

router.get('/blocks', isAuthenticated, (req,res)=>{
    res.render('blocks/allBlocks' ,{
        pageTitle: 'Blocks',
        user: req.session.user,
        messages: res.locals.messages
    })
});

module.exports = router;