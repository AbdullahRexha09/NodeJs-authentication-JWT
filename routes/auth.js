const router = require('express').Router();
const { check,validationResult } = require('express-validator');
const {users} = require('../db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

router.post('/signup',[
    check("email","Please provide email").isEmail(),
    check("password","Please provide password").isLength({
        min:6
    })
], async (req,res)=>{
    const { password, email} = req.body;

    //validate input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    console.log(password,email); 

    let user = users.find((user)=>{
        return user.email === email
    })
    if(user){
        return 
        res.status(400).json({
            "errors": [
        {
            "value": "",
            "msg": "This user exists",
            "param": "user",
            "location": "body"
        }
    ]
        });
    }
    const hashedPassword = await bcrypt.hash(password,10);

    users.push({
        email, 
        password: hashedPassword
    });
    const token = await JWT.sign({
        email
    },"fweeiaajaxlddadxcudkalffe",{
        expiresIn: 360000
    });

    console.log(hashedPassword);
    res.json({
        token
    });
})
router.get('/all',(req,res)=>{
    res.json(users);
});
// router.post('/signup',(res,req)=>{
//      res.send("Working auth");  
// })

module.exports = router