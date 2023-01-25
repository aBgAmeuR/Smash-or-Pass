const con = require("../sql/database");

module.exports = {

  async CreateHistory(User, List, Position) {
    return new Promise((resolve, reject) => {
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = `INSERT INTO HISTORIQUE (Pos_H, Date_H, Pseudo_U, Nom_List) VALUES ('${Position}', '${date}', '${User}', '${List}')`;
      con.query(query, (err, result) => {
        if (err) return reject(new Error("Aleady exist"));
        resolve(result);
      });
    });
  },

  async GetHistory(User) {
    return new Promise((resolve, reject) => {
      const query = `SELECT Nom_List AS Name, Pos_H AS Position, Date_H AS Date FROM HISTORIQUE WHERE Pseudo_U = '${User}' ORDER BY Date_H DESC`;
      con.query(query, (err, result) => {
        if (err) {
          return reject(new Error("Aleady exist"));
        }
        resolve(result);
      });
    });
  },

  async UpdateHistory(User, List, Position) {
    return new Promise((resolve, reject) => {
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = `UPDATE HISTORIQUE SET Pos_H = '${Position}', Date_H = '${date}' WHERE Pseudo_U = '${User}' AND Nom_List = '${List}'`;
      con.query(query, (err, result) => {
        if (err) return reject(new Error("Aleady exist"));
        resolve(result);
      });
    });
  },

};