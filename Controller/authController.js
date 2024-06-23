const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User'); 
const nodemailer = require('nodemailer');
const crypto = require('crypto'); 

function generateVerificationCode() {
    return crypto.randomBytes(3).toString('hex'); 
}

async function registerUser(req, res) {
    const { email, password, firstname, lastname, telephone, website, company, vat, street_address, postcode, city, country } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateVerificationCode();

        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            telephone,
            website,
            company,
            vat,
            street_address,
            postcode,
            city,
            country,
            verificationCode
        });

        await sendVerificationEmail(email, verificationCode);
        
        res.status(201).json({ message: 'User registered successfully. Please check your email for the verification code.', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function sendVerificationEmail(email, verificationCode) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 465, 
        secure: true, 
        auth: {
            user: 'test2104e@gmail.com',
            pass: 'aazzee12' 
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    
    const mailOptions = {
        from: 'test2104e@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text: `Please use the following code to verify your email: ${verificationCode}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in' });
        }
        const token = jwt.sign({ userId: user.id }, "test", { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function verifyEmail(req, res) {
    const { email, verificationCode } = req.body;
    try {
        const user = await User.findOne({ where: { email, verificationCode } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
        user.isVerified = true;
        user.verificationCode = null; 
        await user.save();
        res.status(200).json({ message: 'Email verified successfully , Now admin Verified Your Account you Have request an Email' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

 const acceptAcountRequest = async (req , res )=> {
    const {id} = req.params ; 
    try {
     const user = await User.findOne({where: {id: id}}) ; 
     if(!user) 
        return res.status(404).json({ message: 'User not found' });
     user.acceptRequest = true ;
     await user.save() ;
     res.json({ message: 'User accepted'} ) ;
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const refuseUser = async (req , res) => {
    const {id} = req.params ;
    const user = await User.findOne({where : { id : id}}) ; 
    if(!user)
        return res.status(404).json({ message: 'User not found' });
    await user.destroy() ; 
    res.status(200).json({ message: 'User deleted' }) ;
}

module.exports = {
    registerUser,
    login,
    verifyEmail , 
    acceptAcountRequest,
    refuseUser,
};
