
module.exports = {
    createUser: (req, res) => {
        let { username, password } = req.body;
        req.app.get('db').create_user([username, password, 'https://robohash.org/alan'])
            .then(user => {
                let { id, username, profile_pic } = user[0];
                req.session.userid = id;
                res.send({  username: username, profile_pic: profile_pic })
            })
            .catch(err => res.status(500).send(err))
    },
    checkLogin: (req, res) => {
        let { username, password } = req.body;
        req.app.get('db').find_user([username, password])
            .then(user => {
                let { id, username, profile_pic } = user[0];
                req.session.userid = id;
                console.log(req.session)
                res.send({ username: username, profile_pic: profile_pic })
            })
            .catch(err =>{
                res.status(500).send(err)
            } )
    },
    getAllPosts: (req,res) =>{
        let {userid} = req.session; 
        let {search, userposts} = req.query;

        let db = req.app.get('db');
        if(userposts == 'true' && search){
            db.find_all_post_by_author([search])
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err))
        }

        else if(userposts != 'true' && !search){
            // find post where the current user is not the author
            db.find_all_other_posts([userid])
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err))
        }

        else if(userposts != 'true' && search){
            db.find_post_other_than_author([userid, search])
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err))
        }

        else if(userposts == 'true' && !search){
            db.find_all_post()
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err))
        }
    },
    getPost: (req, res) =>{
        let {postid} = req.params;
        req.app.get('db').find_post([postid])
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    },
    createPost: (req,res) =>{
        let {postTitle, img, content} = req.body;
        let {userid} = req.session;
        req.app.get('db').create_post([postTitle, img, content, userid ])
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    logout: (req, res) =>{
        console.log('destroying session')
        req.session.destroy();
        res.redirect('http://localhost:3000');
    },
    authUser: (req, res) =>{
        let {userid} = req.session;
        req.app.get('db').find_user_by_id([userid])
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err))
    }
}