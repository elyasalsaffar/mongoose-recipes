const User = require('../models/User.js');

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('recipes');
        const data = {
            first: user.first,
            last: user.last,
            picture: user.picture,
            recipes: user.recipes
        };
        res.render('./users/profile.ejs', { user });
    } catch (error) {
        console.error('An error has occurred finding a user!', error.message);
    }
};

module.exports = {
    getUserById
}