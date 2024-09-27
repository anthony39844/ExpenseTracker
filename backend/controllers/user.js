const UserSchema = require("../models/userModel");

exports.addUser = async (req, res) => {
    const {username, password} = req.body;

    const user = UserSchema({
        username, 
        password
    })

    try {
        //validations
        if (!username || !password) {
            return res.status(400).json({message: "All fields are required"})
        } 

        const userExists = await UserSchema.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already taken" });
        }

        await user.save()
        res.status(200).json({message: "User Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.getUsers = async (req, res) => {
    try{
        const users = await UserSchema.find().sort({createdAt: -1})
        res.status(200).json(users)
    } catch(error) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    UserSchema.findByIdAndDelete(id)
        .then((user) => {
            res.status(200).json({message:"User " + user.username + " deleted"})
        })
        .catch((err) => {
            res.status(500).json({message: "Server Error"})
        })
}

exports.loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserSchema.findOne({username})
        if (!user || password != user.password) {
            return res.status(400).json({ message: "Wrong username or password" });
        } 

        req.session.userId = user._id;
        req.session.username = user.username;
        res.status(200).json({ message: "Login successful", user: { id: user._id, username: user.username } });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }   
}   