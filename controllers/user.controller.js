const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

exports.user_create = function(req, res){
  let newuser = new UserModel(
    {
      username : req.body.username,
      email : req.body.email,
      name : req.body.name,
      password : req.body.password
    }
  );

  newuser.save(function(err){
    if(err){
      res.send({"err":err});
      console.log(err);
    }else{
      res.send({"status":"success","type":"User Created successfully"});
    }
  })
}

exports.user_verify =function(req, res, next){
  UserModel.authenticate(req.body.email, req.body.password, async function(error, user){
    if (error || !user) {
       res.send(error);
     } else {
        await UserModel.findOne({"email":req.body.email}).lean().exec(function(err,data)
        {
          res.send({
            "status":"success",
            "type":"successfully authenticate",
            "data":data})
        }
     );
     }
  })
}

exports.user_update = function(req, res){
  let password = req.body.password;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return res.send(err);

      // hash the password using our new salt
      bcrypt.hash(password, salt, async function(err, hash) {
          if (err) return res.send(err);
          // override the cleartext password with the hashed one
          password = hash;

          await UserModel.findOneAndUpdate({_id:req.body._id},
            {$set:{email:req.body.email,
              username:req.body.username,
              name:req.body.name,
              password:password}},{sort: {_id: -1}},
              (err, result) =>
              {
                if (err){
                  return res.send(err)
                }else{res.send({"status":"success","type":"update successful","data":result})
              }
            }
          );
      });
  });
}
