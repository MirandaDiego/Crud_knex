const { hash, compare } = require("bcryptjs");
const AppError = require('../utils/AppErrors,');
const knex = require('../database/knex')

class UsersController {
    async create(request, response) {
        const { name, email, password, avatar } = request.body;

        const hashPassword = await hash(password, 8);

        const [id] = await knex("users").insert({
            name,
            email,
            password: hashPassword,
            avatar
        });

        response.json();

    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("users").where({ id }).del();

        response.json()
    }


    async showUsers(request, response) {

        const users = await knex.select().from("users")

        response.json(users)
    }

    async findUser(request, response) {
        const { name } = request.params;

        const user = await knex("users").whereLike('name', `%${name}%`)

        response.json(user)

    }

    async update(request, response) {
        const { id } = request.params

        const userExists = await knex('users').where('id', id).first()

        if (userExists) {
            const newUser = await knex('users')
                .where('id', id)
                .update({
                    email: request.body.email,
                    password: request.body.password,
                    avatar: request.body.avatar
                })

            response.json(newUser)
        } else {

            response.json('User not found')
        }

        response.json('ERROR')
    }
}

module.exports = UsersController;
