const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
REQUIRED_PASSWORD_LENGTH = 8;

// validating email, it is called in email section of the Schema
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      lowercase: true ,
      max: 20,
      required: 'Username is required',
    },

    name: {
      type: String,
      required: true,
      max: 100
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    passwordResetToken: {
      type: String
    },
    passwordResetExpires: Date
});

//Schema for verifying the Email address
let TokenSchema = new Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200
    }
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        var commonerror={
          "status":"error",
          "type":"email and password doesn't match"
        }
        return callback(commonerror);

      } else if (!user) {
        var error={
          "status":"error",
          "type":"user doesn't exist"
        }
        return callback(error);
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback({"status":"error","type":"password doesn't match"});
        }
      })
    });
}

//password hashing using bcrypt library
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Export the model
var User = mongoose.model('User', UserSchema);
var Token = mongoose.model('Token', TokenSchema);
module.exports = {user:User, token:Token};
