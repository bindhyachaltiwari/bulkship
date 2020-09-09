const formidable = require('formidable');
const userDetails = require('../models/userDetails');
const bcrypt = require('bcrypt');

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
      if (fields.password.length > 55 && fields.password === user.password) {
        const { role, _id, userName, companyName, displayName, clientType, managerRoles, clientDisplay } = user;
        let respObj = {
          status: 'success',
          _id,
          userName,
          companyName,
          displayName,
          role,
          clientType,
        };

        if (role === 'Manager') {
          respObj.managerRoles = managerRoles
        } else if (role === 'Client') {
          respObj.clientDisplay = clientDisplay
        }
        res.status(200).json(respObj);
      } else {
        bcrypt.compare(fields.password, user.password, (error, verified) => {
          if (error) {
            res.json({ status: false, err: 'Wrong Credentials' });
          }
          if (verified) {
            const { role, _id, userName, companyName, displayName, clientType, managerRoles, clientDisplay } = user;
            let respObj = {
              status: 'success',
              _id,
              userName,
              companyName,
              displayName,
              role,
              clientType,
            };

            if (role === 'Manager') {
              respObj.managerRoles = managerRoles
            } else if (role === 'Client') {
              respObj.clientDisplay = clientDisplay
            }
            res.status(200).json(respObj);
          } else {
            let error = new Error('userName or password is incorrect');
            (error.status = 'Failed'), (error.statusCode = 404);
            next(error);
          }
        });
      }
    })
      .catch(err => {
        next(err);
      });
  });
};

exports.validateUser = (req, res, next) => {
  console.log('users' + req.params.userName);
  const pid = req.params.userName;
  console.log(pid);
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
