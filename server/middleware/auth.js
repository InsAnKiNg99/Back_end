const { getUser } = require("../services/auth");

const restrictToLoggedInUsersOnly = async (req, res, next) => {
    const userUid = req.cookies?.uid;
    if (!userUid) return res.redirect("/login");
    const user = getUser(userUid);
    if (!user) return res.redirect("./login");
    res.user = user;
    next();
};

module.exports = {
    restrictToLoggedInUsersOnly,
}