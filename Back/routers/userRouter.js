const express = require('express');
const userRouter = express.Router();

userRouter.post("/", function(req, res) {
    const userName = req.headers.username;
    res.send({username: userName})
});

module.exports= userRouter;