const Joi = require('@hapi/joi');
const authSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
})
const createAdminValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    role: Joi.string().required(),

})

const createFilmValidation = Joi.object({
    title: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
});

const updateFilmValidation = Joi.object({
    title: Joi.string(),
    genre: Joi.string(),
    description: Joi.string(),
    duration: Joi.number().required(),
}).min(1); 

module.exports = {
    authSchema,createAdminValidation,createFilmValidation,
    updateFilmValidation
}