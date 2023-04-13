const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authorMiddleware.js");
const { signUp, logIn } = require('../controller/authorController.js');
const auth = require('../controller/SignGoogleController.js');
const passport = require('passport');

router.post('/signUp', signUp);
router.post('/logIn', logIn);

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
  });

router.get('/auth/google',
passport.authenticate('google',{scope:['email','profile']})
)



router.get('/auth/google/callback',
passport.authenticate('google',{
    successRedirect:'/ravi',
    failureRedirect:'/fail'

})
)

router.get('/ravi', (req, res) => {
    res.send('Ravi Singh');
  });

  router.get('/fail', (req, res) => {
    res.send('byee');
  });



router.all("/*", (req, res) => {
    res.status(400).send({ status: false, message: "Url is not Correct" })
})

module.exports = router;