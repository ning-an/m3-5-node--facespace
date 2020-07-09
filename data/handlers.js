const { users } = require('./users');
let currentUser = {};
let greeting = 'Sign in';
let friendIds;

const handleHomepage = (req, res) => {
    res.status(200).render('pages/homepage', {users, friendIds, greeting});
    console.log(friendIds)
}

const handleProfilePage = (req, res) => {
    const { _id } = req.params;
    const user = users.find( user => user._id === _id );
    const friendsList = users.filter( friend => user.friends.includes(friend._id) );
    res.render('pages/profile', {user, friendsList, greeting});
}

const handleSignin = (req, res) => {
    if (Object.keys(currentUser).length === 0) {
        res.render('pages/signin', {greeting})
    } else {
        res.redirect(`/users/${currentUser._id}`);
    }
}

const handleName = (req, res) => {
    const firstName = req.body.firstName.toLowerCase();
    const user = users.find( user => user.name.toLowerCase() === firstName);
    if (user) {
        friendIds = user.friends;
        currentUser = user;
        greeting = `Howdy, ${currentUser.name}`;
        res.status(200).redirect(`/users/${user._id}`);
    } else {
        res.status(404).redirect('/signin');
    }
}

module.exports = { handleHomepage, handleProfilePage, handleSignin, handleName }