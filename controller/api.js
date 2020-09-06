exports.postUserDetails = (req, res, next) => {
  res.status(200).json('user saved');
}

exports.getAllUsers = (req, res, next) => {
  res.status(200).json({
    users: 'allUsers'
  });
}

