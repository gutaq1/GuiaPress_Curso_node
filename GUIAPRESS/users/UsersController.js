const express = require("express");
const router = express.Router();
const User = require("./User");
const { route } = require("express/lib/application");

router.get("/admin/users", (req, res) =>{
    res.send("Listagem de usuários");
});

router.get("/admin/users/create", (req,res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    res.json({email, password});
});

module.exports = router;