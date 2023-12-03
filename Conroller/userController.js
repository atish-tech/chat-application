const generateToken = require("../Config/generateToken");
const userModel = require("../Models/userModels");


// Register
const registerController = async (request , response) => {
    const {name , email , password} = request.body;

    // empty fields 
    if(!name || !email || !password){
        response.status(400);
        throw new Error("All fields are complsary");
        return;
    }

    // email exist
    // const userEmailExist = await userModel.findOne({email});
    // if(userEmailExist) {
    //     response.status(400);
    //     throw new Error("Email already exist");
    // }

    // Create new entry
    const newUser = await userModel.create({name , email , password});

    if(newUser) {
        response.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    }
    else {
        response.status(400);
        throw new Error("Registration Error");
    }
}

// Login
const loginController = async (request, response) => {
    const { email, password } = request.body;
    const user = await userModel.findOne({ email });  // find email in data base


    if (user && (await user.matchPassword(password))) {  
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }
    else {
        // response.status(401);
        // throw new Error("Envalid username password");
        return response.status(400).json({message : "Incorrect user name"});
    }
}


module.exports = {registerController , loginController};