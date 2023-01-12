const con = require("../sql/database");

module.exports = {
  async CreateUser(username, password, email) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO UTILISATEUR (Pseudo_U, Mdp_U, Mail_U) VALUES ('${username}', '${password}', '${email}')`;
      con.query(query, (err, result) => {
        if (err) {
          reject(new Error("Aleady exist"));
          return;
        }
        resolve(result);
      });
    });
  },

  async GetUser(username, password) {
    return new Promise((resolve, reject) => {
      const query = `SELECT Pseudo_U, Mdp_U FROM UTILISATEUR WHERE Pseudo_U = '${username}' AND Mdp_U = '${password}'`;
      con.query(query, (err, result) => {
        if (err) {
          reject(new Error("User not found"));
          return;
        }
        resolve(result);
      });
    });
  },

  async UpdateUser(username, password, email) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE UTILISATEUR SET Pseudo_U = '${username}', Mdp_U = '${password}', Mail_U = '${email}' WHERE Pseudo_U = '${username}'`;
      con.query(query, (err, result) => {
        if (err) {
          reject(new Error("User not found"));
          return;
        }
        resolve(result);
      });
    }); 
  },

  async DeleteUser(username) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM UTILISATEUR WHERE Pseudo_U = '${username}'`;
      con.query(query, (err, result) => {

        if (err) {
          reject(new Error("User not found"));
          return;
        } else {
          resolve(result);
        }
      });
    });
  }
};
