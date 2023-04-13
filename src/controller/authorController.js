const authorModel = require('../models/authorModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotENV = require('dotenv');
dotENV.config();

exports.signUp = async (req, res) => {
    try {
        const data = req.body;
        const { fName, lName, email, password } = data;

        let validName = /^[a-zA-Z]+$/;
        let validateEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        let validatepassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        if (!validName.test(fName)) return res.status(400).send({ status: false, msg: "pls Provide the valid FirstName" });
        if (!validName.test(lName)) return res.status(400).send({ status: false, msg: "pls Provide the valid last Name" });
        if (!validateEmail.test(email)) return res.status(400).send({ status: false, msg: "pls Provide the email" });
        if (!validatepassword.test(password)) return res.status(400).send({ status: false, msg: "pls Provide the password" });

        const eamilCheck = await authorModel.findOne({ email: email });

        if (eamilCheck) return res.status(400).send({ status: false, msg: "user already register" });

        data.password = await bcrypt.hash(data.password, 10);

        const authorcreate = await authorModel.create(data);

        return res.status(201).send({ status: true, msg: authorcreate });
    }
    catch (err) { return res.status(500).send({ msg: err.message }) }
}

exports.logIn = async(req,res)=>{
    try {

        let author = req.body;

        let { email, password } = author;

        let loggedAuthor = await authorModel.findOne({ email: email })
        if (!loggedAuthor) return res.status(400).send({ msg: "Email is Incorrect!" })


        const checkpasword = await bcrypt.compare(password.trim(), loggedAuthor.password);
        if (!checkpasword) return res.status(400).send({ msg: "password is Incorrect!" });

        let token = jwt.sign(
            {authorId: loggedAuthor._id.toString()},
            '3ad9b2599ea414ddd65e4521c167abd17ece589f75a3779475f0d64b8f52e7f3e330a9c364c1db7d677d35a46fe526976f25bf28b2187da68f4dae66f1d7ae19', 
            { expiresIn: '12h' }
        )

        const UserId = loggedAuthor['_id'];

        return res.status(201).send({ msg: "User logged in successfully!", loggedAuthor, token, UserId })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}