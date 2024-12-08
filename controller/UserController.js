
const User = require('../Schema/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddlewares')

const createToken = (user) => {
    return jwt.sign(
        { id: user._id, contactNumber: user.contactNumber },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

 const registerCOntroller =async (req, res) => {
    const { name, contactNumber, password } = req.body
    try {
        const existingUser = await User.findOne({ contactNumber })
        if (existingUser) {
            return res.status(400).json({
                message: "User Already Exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            contactNumber,
            password: hashedPassword
        })

        await newUser.save();
        const token = createToken(newUser);

        return res.status(200).json({
            message: "User Registered Successfully",
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })

    }
}

const LoginController = async (req, res) => {
    const { name, contactNumber, password } = req.body
    try {

        const userExist = await User.findOne({ contactNumber })

        if (!userExist) {
            return res.status(400).json({
                message: "User doesnt Exist"
            })
        }

        const passwordValid = await bcrypt.compare(password, userExist.password)
        if (!passwordValid) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        const token = createToken(userExist);

        return res.status(200).json({
            message: "Login Successfulll",
            token
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const userdetailsController =async (req, res) => {
    try {
        
        const userId = req.body.userid
       console.log(userId)
       
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        console.log(user)
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching user details',
            error: error.message,
        });
    }
}

module.exports ={registerCOntroller,LoginController,userdetailsController}