const User = require('../models/User.js');
const Recipe = require('../models/Recipe.js');

const createRecipe = async (req, res) => {
    try {
        const user = await User.findById(req.body.author);
        const recipe = await Recipe.create(req.body);
        user.recipes.push(recipe._id);
        await user.save();
        res.redirect(`/recipes/${recipe._id}`);
    } catch (error) {
        console.error('An error has occurred creating a recipe!', error.message);
    }
};

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.render('./recipes/all.ejs', { recipes });
    } catch (error) {
        console.error('An error occurred getting all recipes!', error.message);
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.render('./recipes/show.ejs', { recipe });
    } catch (error) {
        console.error('An error has occurred getting a recipe!', error.message);
    }
};

const updateRecipeById = async (req, res) => {
    try {
        // req.body overwrites any matching fields with the new values. Only the updated fields are necessary.
        // { new: true } ensures that the updated record is what is returned
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/recipes/${recipe._id}`);
    } catch (error) {
        console.error('An error has occurred updating a recipe!', error.message);
    }
};

const deleteRecipeById = async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.render('./recipes/confirm.ejs');
    } catch (error) {
        console.error('An error has occurred deleting a recipe!', error.message);
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipeById,
    deleteRecipeById
}