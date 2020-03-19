const UserDao = require("../DAO/UserDao");
const MD5 = require("md5");

/*----------------- API to register new user ----------------*/

let register = async (req, res) => {
 

  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: "Parameters are missing" });
  } else {
    try {
      let criteria = {
        email: req.body.email
      };

      const checkEmail = await UserDao.getUsers(criteria);
      console.log(checkEmail)
      if (checkEmail && checkEmail.length == 1) {
        res.status(401).json({ message: "email already registered" });
      } else {
        let userData = {
          firstName: req.body.firstName ? req.body.firstName : "",
          lastName: req.body.lastName ? req.body.lastName : "",
          email: req.body.email,
          phone: req.body.phone,
          password: MD5(MD5(req.body.password)),
          status: true
        };

        const addUser = await UserDao.createUser(userData);
        console.log(addUser)
        if (addUser) {
          res.status(200).json({ message: " User registered successfully! " });
        } else {
          res.status(403).json({ message: " Somthing Went Worng! " });
        }
      }
    } catch (err) {
      res.status(404).json({ message: "Somthing went worng!", error: err });
    }
  }
};


module.exports = {
  register: register
}
