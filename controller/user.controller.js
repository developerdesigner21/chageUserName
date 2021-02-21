let Users = require("../model/user.model");
const bcrypt = require("bcrypt");

//register
exports.register = async (req, res) => {
  try {
    console.log("==register==",req.body);
    var user = await Users.findOne({ userName: req.body.username });

    if(!user){
      Users.create({
          userName:req.body.username,
          password:bcrypt.hashSync(req.body.password,10)
      },err=>{
        if(err){
          return res.status(401).send({
            success: flase,
            message: "something wrong in data added"
          });
        }else{
          return res.status(201).send({
            success: true,
            message: "User added sucessfully"
          });
        }
      })
    }else{
      return res.status(401).send({
        success: false,
        message: "user name is already available"
      });
    }
  }
  catch (err) {
    res.status(422).send({ success: false, message: err.message });
  }
};

//login
exports.login = async (req, res) => {
  try {
    console.log("==login==",req.body);
    var user = await Users.findOne({ userName: req.body.username });

    if(user){
        if (await bcrypt.compare(req.body.password, user.password)){
          return res.status(201).send({
            success: true,
            message: "User loged in successfully."
          });
        }else{
          return res.status(422).send({
            success: false,
            message: `Password is incorrect`
          });
        }
    }else{
      return res.status(401).send({
        success: false,
        message: "user not available"
      });
    }
  }
  catch (err) {
    res.status(422).send({ success: false, message: err.message });
  }
};

exports.changeUserName = async (req, res) => {
  try {
    console.log("==login==",req.body);
    var userNameArray = req.body.usernamelist
    var temp = 0
    for(var i=0;i<userNameArray.length;i++){
      console.log(userNameArray[i]);
      var user = await Users.findOne({ userName: userNameArray[i] });
      if(!user){
        temp = 1
        await Users.findOneAndUpdate({userName:req.body.currentUserName},{userName:userNameArray[i]})
        return res.status(201).send({
          success: true,
          message: `your userName is changed to ${userNameArray[i]}`
        });
        break;
      }
    }
    if(temp==0){
      return res.status(401).send({
        success: false,
        message: "No one user name is available"
      });
    }
  }
  catch (err) {
    res.status(422).send({ success: false, message: err.message });
  }
};