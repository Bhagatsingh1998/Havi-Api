// not using
// const jwt = require('jsonwebtoken');

const User = require('./../modal/user');
const bcryptjs = require('bcryptjs');
const baseURL = require('../baseURL').baseURL;

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
        statusCode: 301,
        status: 'Error', 
        message: 'Email address already present.',
        userDetails: null,
        request: {
          url: `${baseURL}/user/signup`,
          verb: 'POST'
        }
      });
    } else {
      if(req.body.password !== req.body.cpassword) {
        return res.status(301).json({
          statusCode: 301,
          status: 'Error', 
          message: 'Password and confirm password didnt match',
          userDetails: null,
          request: {
            url: `${baseURL}/user/signup`,
            verb: 'POST'
          }
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
          // console.log(dataSaved);
          return res.status(201).json({
            statusCode: 201,
            status: 'Success', 
            message: 'User saved in database',
            userDetails: dataSaved,
            request: {
              url: `${baseURL}/user/signup`,
              verb: 'POST'
            }
          });
        })
        .catch(err => {
          // console.log(err);
          next(error);
        })
      }
    }
  })
}

exports.postUserLogin = (req, res, next) => {
  // console.log(req.body.email);

  User.findOne({email: req.body.email})
  .then(user => {
    // console.log(user);
    if(!user) {
      return res.status(301).json({
        statusCode: 301,
        status: 'Error', 
        message: 'Entered email not found',
        userDetails: null,
        request: {
          url: `${baseURL}/user/login`,
          verb: 'POST'
        }
      });
    } else {
      return bcryptjs.compare(req.body.password, user.password)
      .then(doMatch => {
        // console.log(doMatch);
        if(!doMatch) {
          // console.log('doMatch: 53');
          return res.status(301).json({
            statusCode: 301,
            status: 'Error', 
            message: 'Invalid Password',
            userDetails: null,
            request: {
              url: `${baseURL}/user/login`,
              verb: 'POST'
            }
          }) 
        } else {
          let time = new Date();
          user.loggedIn.push(time);
          return user.save()
          .then(saveData => {
            // const token = jwt.sign({
            //   email: saveData.email,
            //   id: saveData._id
            // }, 
            // 'secret_key', 
            // {
            //   expiresIn: "1h"
            // })
            // console.log('saveData');
            return res.status(201).json({
              statusCode: 201,
              status: 'Success', 
              message: 'LoggedIn',
              userDetails: saveData,
              request: {
                url: `${baseURL}/user/login`,
                verb: 'POST'
              }
            });
          })
        }
      })
    }
  })
  .catch(error => {
    // console.log(err);
    next(error)
  });
}

exports.getAllUsers = (req, res, next) => {
  User.find()
  .then(users => {
    // console.log(users);
    res.status(200).json({
      statusCode: 200,
      status: 'Success', 
      message: 'All Users',
      users: users,
      request: {
        url: `${baseURL}/user`,
        verb: 'GET'
      }
    });
  })
  .catch(error => {
    // console.log(err);
    next(error);
  });
}

exports.postAddToDoList = (req, res, next) => {
  const user_id = req.params.user_id;
  // console.log((user_id));

  User.findById(user_id)
  .then(user => {
    if(!user) {
      return res.status(404).json({
        statusCode: 404,
        status: 'Error', 
        message: 'Invalid userId, TODO cannot be saved',
        userDetails: null,
        request: {
          url: `${baseURL}/user/${user_id}`,
          verb: 'POST'
        }
      });
    }
    // console.log(user);
    const list = req.body.data;
    user.toDoList.push(list);
    return user.save()
  })
  .then(savedData => {
    // console.log(savedData);
    return res.status(201).json({
      statusCode: 201,
        status: 'Success', 
        message: 'TODO saved',
        userDetails: savedData,
        request: {
          url: `${baseURL}/user/${user_id}`,
          verb: 'POST'
        }
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
        statusCode: 404,
        status: 'Error', 
        message: 'Invalid userId, user not found',
        userDetails: null,
        request: {
          url: `${baseURL}/user/${user_id}`,
          verb: 'GET'
        }
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        status: 'Success', 
        message: 'Valid userId, user found. ',
        userDetails: user,
        request: {
          url: `${baseURL}/user/${user_id}`,
          verb: 'GET'
        }
      });
    }
  })
  .catch(error => {
    // console.log(err);
    next(error);
  });
}

exports.patchUserUpdate = (req, res, next) => {
  const user_id = req.params.user_id;
  // console.log((user_id));

  User.findById(user_id)
  .then(user => {
    if(!user) {
      return res.status(404).json({
        statusCode: 404,
        status: 'Error', 
        message: 'Invalid userId, user not found',
        userDetails: null,
        request: {
          url: `${baseURL}/user/${user_id}`,
          verb: 'PATCH'
        }
      });
    }
    // console.log(user);
    // console.log(req.body);
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
      statusCode: 201,
        status: 'Success', 
        message: 'Valid userId, user details updated. ',
        userDetails: savedData,
        request: {
          url: `${baseURL}/user/${user_id}`,
          verb: 'PATCH'
        }
    });
  })
  .catch(error => {
    // console.log(err);
    next(error);
  })
}     

exports.deleteUser = (req, res, next) => {
  const user_id = req.params.user_id;
  // console.log((user_id));

  User.findByIdAndDelete(user_id)
  .then(user => {
    if(!user) {
      return res.status(404).json({
        statusCode: 404,
          status: 'Error', 
          message: 'Invalid userId, user not found. ',
          userDetails: null,
          request: {
            url: `${baseURL}/user/${user_id}`,
            verb: 'DELETE'
          }
      });
    }
    // console.log(user);
    return res.status(200).json({
      statusCode: 200,
      status: 'Success', 
      message: 'Valid userId, user deleted successfully.',
      userDetails: null,
      request: {
        url: `${baseURL}/user/${user_id}`,
        verb: 'DELETE'
      }
    });
  })
  .catch(error => {
    // console.log(err);
    next(error);
  })
}