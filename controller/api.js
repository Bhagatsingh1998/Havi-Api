const jwt = require('jsonwebtoken');

const User = require('./../modal/user');
const bcryptjs = require('bcryptjs');

exports.postUserDetails = (req, res, next) => {
  // console.log(req.body);
  let totalUsers;
  User.find()
  .then(users => {
    totalUsers = users.length;
    return User.findOne({email: req.body.email })
  })
  .then(user => {
    if(user) {
      return res.status(301).json({
        message: 'Email address already present.'
      });
    } else {
      if(req.body.password !== req.body.cpassword) {
        return res.status(301).json({
          message: 'Password didnt match'
        });
      } else {
        return bcryptjs.hash(req.body.password, 12)
        .then(hashedPassword => {
          let userType;
          if(+req.body.isAdmin == 0) {
            userType = 'Admin';
          } else {
            userType = 'User';
          }
    
          const user = new User({
            id: totalUsers + 1,
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            phone: req.body.phone,
            dob: req.body.dob,
            password: hashedPassword,
            gender: req.body.gender,
            avtarNumber: req.body.avtarNumber,
            userType: userType,
            signupTime: new Date()
          });
          return user.save()
        })
        .then(dataSaved => {
          console.log(dataSaved);
          return res.status(201).json({
            message: 'User Saved'
          });
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  })
}

exports.postUserLogin = (req, res, next) => {
  console.log(req.body.email);

  User.findOne({email: req.body.email})
  .then(user => {
    console.log(user);
    if(!user) {
      return res.status(301).json({
        message: 'Email not found'
      });
    } else {
      return bcryptjs.compare(req.body.password, user.password)
      .then(doMatch => {
        console.log(doMatch);
        if(!doMatch) {
          console.log('doMatch: 53');
          return res.status(301).json({
            message: 'Invalid Password'
          }) 
        } else {
          let time = new Date();
          user.loggedIn.push(time);
          return user.save()
          .then(saveData => {
            const token = jwt.sign({
              email: saveData.email,
              id: saveData._id
            }, 
            'secret_key', 
            {
              expiresIn: "1h"
            })
            // console.log('saveData');
            return res.status(201).json({
              message: 'User LoggedIn',
              auth: token,
              userDetails: saveData
            });

          })
        }
      })
    }
  })
  .catch(err => {
    console.log(err);
  })
}

exports.getAllUsers = (req, res, next) => {
  console.log('aaa');
  User.find()
  .then(users => {
    console.log(users);
    res.status(200).json({
      message: 'All Users',
      users: users
    });
  })
  .catch(err => {
    console.log(err);
  });
}

exports.postAddToDoList = (req, res, next) => {
  const user_id = req.params.user_id;
  // console.log((user_id));

  User.findById(user_id)
  .then(user => {
    // console.log(user);
    const list = req.body.data;
    user.toDoList.push(list);
    return user.save()
  })
  .then(savedData => {
    console.log(savedData);
    return res.status(201).json({
      message: 'ToDoList Saved',
      userDetails: savedData
    });
  })
  .catch(err => {
    console.log(err);
  });
}

exports.getUserDetails = (req, res, next) => {
  const user_id = req.params.user_id;
  // console.log((user_id));

  User.findById(user_id)
  .then(user => {
    if(!user) {
      return res.status(404).json({
        message:  'Invalid UserId'
      });
    } else {
      return res.status(200).json({
        message: 'User Details',
        userDetails: user
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
}

exports.patchUserUpdate = (req, res, next) => {
  const user_id = req.params.user_id;
  // console.log((user_id));

  User.findById(user_id)
  .then(user => {
    // console.log(user);
    console.log(req.body);
    const name = req.body.name;
    const username = req.body.userName;
    const dob = req.body.dob;
    const phone = req.body.phone;
    const gender = req.body.gender;

    user.name = name;
    user.userName = username;
    user.dob = dob;
    user.phone = phone;
    user.gender = gender;
    
    return user.save()
  })
  .then(savedData => {
    return res.status(201).json({
      message: 'Updated successfully',
      userDetails: savedData
    });
  })
  .catch(err => {
    console.log(err);
  })
}     

exports.deleteUser = (req, res, next) => {
  const user_id = req.params.user_id;
  // console.log((user_id));

  User.findByIdAndDelete(user_id)
  .then(user => {
    // console.log(user);
    return res.status(200).json({
      message: 'User Deleted'
    });
  })
  .catch(err => {
    console.log(err);
  })
}