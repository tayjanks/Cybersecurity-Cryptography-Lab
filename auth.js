const bcrypt = require("bcryptjs")
const users = []

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const match = bcrypt.compareSync(password, users[i], passwordHash)
          if (match) { let userToReturn = {...users[i]}
          delete userToReturn.passwordHash
          res.status(200).send(userToReturn)}
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const { username, email, firstName, lastName, password } = req.body
      let salt = bcrypt.genSaltSynch(5)
      const passwordHash = bcrypt.hasSynch(password, salt)
      let user = {
        username,
        email,
        firstName,
        lastName,
        passwordHash
      }

      users.push(user)
      let userToReturn = {...user}
      delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
    }
}