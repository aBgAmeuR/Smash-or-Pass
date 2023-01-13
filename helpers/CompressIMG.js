const sharp = require('sharp');

exports.SmashListCover = async (file, NameList) => {
  return new Promise((resolve, reject) => {
    sharp(file)
      .toFormat('webp')
      .resize(500, 500)
      .webp({ quality: 90 })
      .toFile(`img/${NameList}/cover.webp`, (err, info) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(info);
      });
  });
};

exports.SmashListItem = async (file, NameList, NameItem) => {
  return new Promise((resolve, reject) => {
    sharp(file)
      .toFormat('webp')
      .resize({ width: 500 })
      .webp({ quality: 90 })
      .toFile(`img/${NameList}/${NameItem}.webp`, (err, info) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(info);
      });
  });
};