const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const User = mongoose.model("User");


const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "ydhdhnnbczwqpypqd575g";


router.get('/', (req, res) => {
    res.send("hello photoshooto")
})


router.post('/signup', (req, res) => {
    const { email, password, designation } = req.body
    if (!email || !password) { //if any of these is empty then error
        return res.status(422).json({ error: "please add all the fields" });
    } //status to show the status or request
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exist with that email !" });
            }
            bcryptjs.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        designation
                    })
                    user.save()
                        .then(user => {
                            res.json({
                                message: "saved successfully"
                            })

                        })
                        .catech(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                })
        }
            //res.json({ message: "successfully posted" }); //sending responce
            //console.log("added");
        )
        .catch(err => {
            console.log(err);
        })
})


router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if ((!email || !password)) {
        return res.status(422).json({ error: "please add valid email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "invalid email or password" })
            }
            bcryptjs.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({ message: "successfully signed in" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        const { _id, email } = savedUser
                        res.json({ token, user: { email, _id } })
                    } else {
                        return res.status(422).json({ error: "invalid email in or password" })

                    }
                })
                // bcryptjs.compare(password, savedUser.password)
                //     .then(doMatch => {
                //         if (doMatch) {
                //             //res.json({ message: "successfully signed in" })
                //             const token = jwt.sign({ email: savedUser.email }, JWT_SECRET);
                //             const { name, email } = savedUser
                //             res.json({ token, user: { name, email } })
                //         } else {
                //             return res.status(422).json({ error: "invalid email in or password" })

                //         }

                //     })
                .catch(err => {
                    console.log(err)
                })

        })
        .catch(err => {
            console.log(err)
        })
});

module.exports = router;