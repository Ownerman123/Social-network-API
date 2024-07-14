const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
  } = require('../../controllers/thoughtController.js');
  
  // /api/thought
  router.route('/').get(getThoughts);

  // /api/thought/:userId

  router.route('/:userId').post(createThought);
  
  // /api/thought/:thoughtId
  router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

  router
    .route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;