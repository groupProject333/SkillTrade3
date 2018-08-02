const router = require("express").Router();

const profileRoutes = require("./profile");
// Book routes
// router.use("/users", userRoutes);
// router.use("/message", messageRoutes);

router.use("/profiles", profileRoutes);

// return router;

module.exports = router;
