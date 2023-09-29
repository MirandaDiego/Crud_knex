const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const userRoutes = Router();


const usersController = new UsersController();

userRoutes.post("/", usersController.create);
userRoutes.delete("/:id", usersController.delete)
userRoutes.get("/", usersController.showUsers)
userRoutes.get("/:name", usersController.findUser)
userRoutes.put('/:id', usersController.update)


module.exports = userRoutes;