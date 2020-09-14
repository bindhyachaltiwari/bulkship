const formidable = require('formidable');
const userDetails = require('../models/userDetails');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('CiI1qd4zu0Hn3ZQGJNtAFglzmYeRaGeO');

exports.login = (req, res, next) => {
  const promiseAllHandler = (p) => {
    return Promise.all(p.map(p => p.catch(e => e)));
  };
  const form = new formidable.IncomingForm();
  form.on('field', function (name, value) {
  });

  form.parse(req, function (err, fields, files) {
    userDetails.findOne({ userName: fields.email }).then((user) => {
      if (!user) {
        throw new Error('UserName or password is incorrect');
      }

      const realPassword = cryptr.decrypt(user.password);
      if (realPassword === fields.password && (user.isActive || user.role === 'Admin')) {
        const { role, _id, userName, companyName, displayName, clientType, managerRoles, clientDisplay, isActive } = user;
        let respObj = {
          status: 'success',
          _id,
          userName,
          companyName,
          displayName,
          role,
          clientType,
          isActive
        };

        if (role === 'Manager') {
          respObj.managerRoles = managerRoles
        } else if (role === 'Client') {
          respObj.clientDisplay = clientDisplay
        }
        res.status(200).json(respObj);
      } else if (realPassword === fields.password && !user.isActive) {
        res.json({ status: false, err: 'User is not active' });
      } else {
        let error = new Error('UserName or password is incorrect');
        (error.status = 'Failed'), (error.statusCode = 404);
        next(error);
      }
    })
      .catch(err => {
        next(err);
      });
  });
};

exports.validateUser = (req, res, next) => {
  const pid = req.params.userName;
  const query = userDetails
    .find({
      userName: pid
    })
    .then(product => {
      if (!product) {
        throw new Error("User doesn't exist");
      }
      res.json(product);
    })
    .catch(err => {
      next(err);
    });
};
