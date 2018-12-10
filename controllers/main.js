const Router = require('express-promise-router')
const router = new Router();

router.get('/', (req,res)=>{
    res.render('index', {
        pageTitle: 'Home',
        user: req.session.user
    });
});


module.exports = router;