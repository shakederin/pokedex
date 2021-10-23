const express = require('express');
const pokemonRouter = require("./routers/pokemonRouter");
const userRouter = require("./routers/userRouter")
const handleError = require("./middleware/errorHandler")
const userHandler = require("./middleware/userHandler")
const app = express();
const port = 8080;



app.listen(port, function() {
  console.log('app started');
});
app.use(userHandler)
app.use("/", pokemonRouter);
app.use("/info", userRouter)
app.use(handleError)

// function handleError(err, req, res, next){
//   res.send(err)
// }