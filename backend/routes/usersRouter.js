const router = require('express').Router();
var User = require('../models/users');

router.route('/').get((req, res) => {
    console.log("Getting...");
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log("Posting...");
  const username = req.body.username;
  const newUser = new User({username});
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;