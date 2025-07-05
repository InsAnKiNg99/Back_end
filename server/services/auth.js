sessionIdTOUserMap = new Map();

function setUser(id, user) {
    sessionIdTOUserMap.set(id, user);
}

function getUser(id) {
    sessionIdTOUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}