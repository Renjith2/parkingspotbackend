const User = require('../Schema/UserSchema');

const walletUpdate =async (req, res) => {
    const { amountToAdd } = req.body;
    

    const userId=req.body.userid;
    console.log("ee",req.body.userid)

    try {
       
        const user = await User.findById(userId);

        if (!user) {
            console.log("no User")
            return res.status(404).json({ message: 'User not found.' });
            
        }

        
        user.walletBalance += amountToAdd;
        console.log(user)
        await user.save();

        res.status(200).json({ walletBalance: user.walletBalance });
    } catch (error) {
        console.error('Error updating wallet balance:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports={walletUpdate}