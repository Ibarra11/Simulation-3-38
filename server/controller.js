
module.exports = {
    createUser: (req, res) => {
        let { username, password } = req.body;
        req.app.get('db').create_user([username, password, 'https://robohash.org/alan'])
            .then(user => {
                let { id, username, profile_pic } = user[0];
                res.send({ id: id, username: username, profile_pic: profile_pic })
            })
            .catch(err => res.status(500).send(err))
    },
    checkLogin: (req, res) => {
        let { username, password } = req.body;
        req.app.get('db').find_user([username, password])
            .then(user => {
                let { id, username, profile_pic } = user[0];
                res.send({ id: id, username: username, profile_pic: profile_pic })
            })
            .catch(err => res.status(500).send(err))
    }
}