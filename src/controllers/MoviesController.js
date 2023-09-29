const knex = require('../database/knex');

class MoviesController {

    async create(request, response) {
        const { title, description, grade, id_user } = request.body

        const movie = await knex("movies").insert({
            title,
            description,
            grade,
            id_user
        });
       
        response.json(movie);
    }

    async delet(request, response){
        const { id } = request.params;

        await knex("movies").where({id}).del();

        response.json("film deleted")
    }

    async AllMovies(request, response){
        
       const movies =  await knex.select().from("movies")

        response.json(movies)
    }

    async show(request, response){
        const { id } = request.params;

        const movie = await knex("movies").where({ id }).first();
        const tags = await knex('tags_movie').where({movie_id: id}).orderBy("name");

        return response.json({
            ...movie,
            tags
        })
    }
}

module.exports = MoviesController;