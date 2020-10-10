const router = require('express').Router();
let Exercise = require('../models/exercise');
// .get
router.route('/').get((req, res, next) => {
  console.log("Getting exercise...");
  Exercise.find({})
    .then(exercises => {
      if(exercises.length != 0){
        console.log("--Inside else exist--");
        console.log(exercises.length);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(exercises);
      }
      else{
        console.log("--Inside else exist--");
        err = new Error("--No exercise present--");
        err.status = 404;
        return next(err);
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
// .post /add
router.route('/add').post((req, res) => {
  console.log("Posting exercise...");
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
// .get /:id
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});
// .delete /:id
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
// .update /:id
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;