// Helper methods to allow the application to interact with a MongoDB database.
const mongoose = require('mongoose');
const catSchema = mongoose.Schema(
  {
    imgUri: String,
    title: String,
    desc: String,
  },
  {
    collection: process.env.DEFAULT_COLLECTION,
  }
);
const Cat = mongoose.model('Cat', catSchema);
const auth = process.env.DB_USERNAME
  ? {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    }
  : '';

const options = {
  useNewUrlParser: true,
  dbName: process.env.DEFAULT_DATABASE,
  auth,
};
class DB {
  connect(uri) {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(
          uri,
          options
        )
        .then(
          () => {
            resolve('Connection to the database established');
          },
          err => {
            reject('Cannot connect to the database');
            console.log(err);
          }
        );
    });
  }

  disconnect() {
    mongoose.disconnect();
  }

  saveCat(cat) {
    const obj = new Cat(cat);
    return new Promise((resolve, reject) => {
      Cat.findOne(
        {
          imgUri: obj.imgUri || null,
          title: obj.title || null,
          desc: obj.desc || null,
        },
        function(err, cat) {
          if (!cat) {
            obj.save(function(err, obj) {
              if (err) reject(err);
              resolve({
                ok: true,
                message: `Congratulations, your cat ${
                  obj.title
                } was added to the database succesfully.`,
              });
            });
          } else {
            resolve({
              ok: false,
              message: `A cat with title ${
                obj.title
              } already exists in the database. Please select another title.`,
            });
          }
        }
      );
    });
  }

  removeCat(cat) {
    return new Promise((resolve, reject) => {
      Cat.deleteOne({ title: cat.title }, function(err) {
        if (err) reject(err);
        resolve(
          `Cat with title ${
            cat.title
          } was removed from the database successfully.`
        );
      });
    });
  }

  getCats() {
    return new Promise((resolve, reject) => {
      Cat.find(function(err, cats) {
        if (err) reject(err);
        resolve(cats);
      });
    });
  }

  cleanDB() {
    return new Promise(resolve => {
      Cat.remove({}, function() {
        resolve('Database was cleaned succesfully');
      });
    });
  }
}

module.exports = DB;
