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
      const query = `INSERT INTO ITEM_LIST (Img_Item, Nom_Item, Desc_Item, List_Item) VALUES ('${Img}', '${Name}', '${Description}', '${NameList}')`;
      con.query(query, (err, result) => {
        if (err) return reject(new Error("Aleady exist"));
        resolve(result);
      });
    });

  },

};