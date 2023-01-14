const con = require("../sql/database");

module.exports = {

  async CreateSmashList(Name, Description, Categorie, User) {
    return new Promise((resolve, reject) => {
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = `INSERT INTO SMASH_LIST (Nom_List, Desc_List, Categorie_List, Createur_List, Date_List) VALUES ('${Name}', '${Description}', '${Categorie}', '${User}', '${date}')`;
      con.query(query, (err, result) => {
        if (err) return reject(new Error("Aleady exist"));
        resolve(result);
      });
    });
  },

  async AddItemSmashList(Img, Name, Description, NameList) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ITEMS (Img_Item, Nom_Item, Desc_Item, Nom_List) VALUES ('${Img}', '${Name}', '${Description}', '${NameList}')`;
      con.query(query, (err, result) => {
        if (err) {
          return reject(new Error("Aleady exist"));
        }
        resolve(result);
      });
    });
  },

  async GetSmashListItems(NameList) {
    return new Promise((resolve, reject) => {
      const query = `SELECT Img_Item AS Image, Nom_Item AS Name, Desc_Item AS Description, Smash_Item AS SmashCount, Pass_Item AS PassCount FROM ITEMS WHERE Nom_List = '${NameList}' ORDER BY Img_Item ASC;`;
      con.query(query, (err, result) => {
        if (err) {
          return reject(new Error("Aleady exist"));
        }
        resolve(result);
      });
    });
  },

  async GetSmashList(NameList) {
    return new Promise((resolve, reject) => {
      const query = `SELECT Nom_List AS Name, Desc_List AS Description, Createur_List AS Creator, Date_List AS CreationDate, Categorie_List AS Categorie FROM SMASH_LIST WHERE Nom_List = '${NameList}'`;
      con.query(query, (err, result) => {
        if (err) {
          return reject(new Error("Aleady exist"));
        }
        resolve(result);
      })
    });
  },
};