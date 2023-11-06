const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get("/admin/users", (req, res) =>{
   User.findAll().then(users => {
    res.render("admin/users/index", {users: users});
   });
});

router.get("/admin/users/create", (req,res) => {
    res.render("admin/users/create");
});

//rota de cadastro de user
router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

// verifica se user esta cadastrado
    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
        
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });

        }else{
            res.redirect("/admin/users/create");
        }
    });

});

router.get("/login", (req, res) =>{
    res.render("admin/users/login");
});

// Verifica authenticate de user
router.post("/authenticate", (req, res)=> {

    var email = req.body.email;
    var password = req.body.password;

        User.findOne({where: {email: email}}).then(user =>{
            if(user != undefined){ // se existir um user com esse e-mail
                // validar a senha
                var correct = bcrypt.compareSync(password, user.password);

                if(correct){
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.json(req.session.user);
                }else{
                    res.redirect("/login");
                }
            }else{
                res.redirect("/login");
            }
        });

});

module.exports = router;