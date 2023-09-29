const knex = require('../database/knex');

class TagsController {

    async create(request, response){
        const{name, movie_id, user_id} = request.body;

       const tag = await knex('tags_movie').insert({
            name,
            movie_id,
            user_id
        });
        response.json(tag)
    }
    async delete(request, response){
        const {id} = request.params;

      await knex("tags_movie").where({id}).del();

        response.json("tag deleted")
    }


}

module.exports = TagsController;