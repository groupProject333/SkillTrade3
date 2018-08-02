const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profileController');


// Route for grabbing a specific profile by id, populate it with it's listings and reviews
router.route("/:id")
    .get(profileController.getUserProfile)
    .put(profileController.updateProfile);
    
router.route("/all")
    .get(profileController.getAllProfiles);

router.route("/username/:username")
    .get(profileController.getProfilebyUsername);

router.route("/exist/:id/:username")
    .get(profileController.checkIfProfileExists);
router.route("/post")
    .post(profileController.addReview);
// Route for saving/updating an Profiles's number of karmaChips
router.route("/chips/:id/:chips")
    .put(profileController.addChips);
router.route("/reviews/:id")
    .get(profileController.getReviewBody)

module.exports = router;