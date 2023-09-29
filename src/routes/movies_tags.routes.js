const  { Router } = require("express");

const TagsController = require('../controllers/TagsController');

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.post("/", tagsController.create);
tagsRoutes.delete("/:id", tagsController.delete)

module.exports = tagsRoutes;