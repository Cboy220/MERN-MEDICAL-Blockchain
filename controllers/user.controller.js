const Model = require('../models/user.model');
const UserModel = Model.user;
const Token = Model.token;
const bcrypt = require('bcrypt');

SALT_WORK_FACTOR = 10;

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {validationResult} = require('express-validator');

exports.user_create = function(req, res){
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.send({"status":"error","message":errors.array()});
  } else {
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
        let token = new Token(
          {
            _userId: newuser._id,
            token: crypto.randomBytes(2).toString('hex')
          }
        );

        let transporter = nodemailer.createTransport(
          {
            service: 'Gmail',
            auth: {
                user: 'easypasal2019@gmail.com',
                pass: 'easypasal2019#@'
            }
        });
        let mailOptions = {
         from: 'EasyPasal',
         to: newuser.email,
         subject: 'Account Verification Token',
         text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'+'\n\n\n'+"You can also use code"+"\n\n"+token.token
        };
        token.save(function (err) {
            if (err) { return res.send({"status":"error", "message": err.message }); }

            transporter.sendMail(mailOptions, function (err)
            {
               if (err) {
                  return res.send({"status":"error", "message": err.message });
                }
               res.send({"status":"success","next":"verify","message":'A verification email has been sent to ' + newuser.email + '.'});
            });
          });
        //res.send({"status":"success","type":"User Created successfully"});
      }
    });
  }
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

exports.user_confirmation = function (req, res, next) {
    // Check for validation errors
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.send({"status":"error","message":errors.array()});
    }else{
      // Find a matching token
      Token.findOne({ token: req.body.token }, function (err, token) {
          if (!token) return res.status(400).send({"status":"error", type: 'not-verified', "message": 'We were unable to find a valid token. Your token my have expired.' });

          // If we found a token, find a matching user
          UserModel.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
              if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
              if (user.isVerified) return res.status(400).send({"status":"error", type: 'already-verified', "messasge": 'This user has already been verified.' });

              // Verify and save the user
              user.isVerified = true;
              user.save(function (err) {
                  if (err) { return res.status(500).send({"status":"error", "message": err.message }); }
                  res.status(200).send({"status":"success","message":"The account has been verified. Please log in."});
              });
          });
      });
    }
};

exports.user_resend = function (req, res, next) {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.send({"status":"error","message":errors.array()});
    }else{
      UserModel.findOne({ email: req.body.email }, function (err, user) {
          if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
          if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

          let token = new Token(
            {
              _userId: user._id,
              token: crypto.randomBytes(2).toString('hex')
            }
          );
          // Save the token
          token.save(function (err) {
              console.log("check point 1");
              if (err) { return res.status(500).send({ msg: err.message }); }

              let transporter = nodemailer.createTransport(
                {
                  service: 'Gmail',
                  auth: {
                      user: 'easypasal2019@gmail.com',
                      pass: 'easypasal2019#@'
                  }
              });

              let mailOptions = {
               from: 'EasyPasal',
               to: user.email,
               subject: 'Account Verification Token',
               text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'+'\n\n\n'+"You can also use code"+"\n\n"+token.token
              };

              transporter.sendMail(mailOptions, function (err) {
                console.log("check point 2");
                  if (err) {
                    console.log("check point 3");
                     // return res.send({"status":"error", "message": err.message });
                  }else{
                    console.log("check point 4");
                    //res.send({"hello":"hello"});
                    res.send(
                      {
                        "status":"success",
                        "next":"verify",
                        "message":'A verification email has been sent to ' + user.email
                      }
                    );
                  }
              });
          });
      });
    }
};

exports.user_passwordreset = function(req, res, next){
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.send({"status":"error","message":errors.array()});
  }else{
    UserModel.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });

        let token = new Token(
          {
            _userId: user._id,
            token: crypto.randomBytes(2).toString('hex')
          }
        );

        user.update({
          passwordResetToken:token.token,
          passwordResetExpires:Date.now() + 360000
        },function(err){
          if(err){
            return res.send({"status":"error","message":"unable to update"});
          }
        }
      );

        let transporter = nodemailer.createTransport(
          {
            service: 'Gmail',
            auth: {
                user: 'easypasal2019@gmail.com',
                pass: 'easypasal2019#@'
            }
        });

        let mailOptions = {
         from: 'EasyPasal',
         to: user.email,
         subject: 'Password Reset Token',
         text: 'Hello,\n\n' + ' Somebody (maybe you) request to change the password of your account from our SmartAPP: \nhttp:\/\/' + req.headers.host + '\/reset\/' + token.token + '.\n'+'\n\n\n'+"You can also use code"+"\n\n"+token.token
        };

        transporter.sendMail(mailOptions, function (err) {
          console.log("check point 2");
            if (err) {
              console.log("check point 3");
               // return res.send({"status":"error", "message": err.message });
            }else{
              console.log("check point 4");
              //res.send({"hello":"hello"});
              res.send(
                {
                  "status":"success",
                  "next":"verify",
                  "message":'A verification email has been sent to ' + user.email
                }
              );
            }
        });
    });
  }
}

exports.user_resetget = function(req, res, next){
    UserModel.findOne({
      passwordResetToken:req.params.token,
      passwordResetExpires:{$gt:Date.now()}
    }).then( user =>{
      if(user==null){
        res.send({"status":"error","message":"token doensn't match or expire","token":"hello"});
      }else{
        res.send({"status":"success","message":"Work is complete","user":user._id})
        // return res.redirect('/');
      }
    }
    );
}

exports.user_updatepassword= function(req, res){
  UserModel.findOne({
    _id:req.params.id,
    passwordResetToken:req.body.token,
    passwordResetExpires:{$gt:Date.now()}
  }).then( user =>{
    if(user==null){
      res.send({"status":"error","message":"token doensn't match or expire","token":req.params.id});
    }else{
      let password = req.body.password;
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return res.send(err);
          // hash the password using our new salt
          bcrypt.hash(password, salt, async function(err, hash) {
              if (err){
                return res.send(err);
              }else{
                // override the cleartext password with the hashed one
                password = hash;
                user.update({
                  password:password,
                  passwordResetToken:null,
                  passwordResetExpires:null
                },err =>{
                  if(err){
                    res.send({"status":"error","message":"Error in updating password"});
                  }else{
                    res.send({"status":"success","message":"Successfully updated password"})
                  }
                })
            }
          });
      });
    }
  }
  );
}
