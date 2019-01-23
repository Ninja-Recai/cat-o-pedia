// Helper methods to allow the application to interact with a MongoDB database.
const mongoose = require('mongoose');
const catSchema = mongoose.Schema(
  {
    imgUri: String,
    title: String,
    desc: String,
    likes: Number,
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
          likes: 0,
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

  getSingleCat(title) {
    return new Promise((resolve, reject) => {
      Cat.findOne(
        {
          title: title || null,
        },
        function(err, cat) {
          if (!cat) {
            reject({
              ok: false,
              message: `Cat with title ${title} does not exist.`,
            });
          } else {
            Cat.find({ _id: { $lt: cat.id } }, function(err, prev) {
              Cat.find({ _id: { $gt: cat.id } }, function(err, next) {
                resolve({
                  cat,
                  prev,
                  next,
                });
              })
                .sort({ _id: 1 })
                .limit(1);
            })
              .sort({ _id: -1 })
              .limit(1);
          }
        }
      );
    });
  }

  getCats() {
    return new Promise((resolve, reject) => {
      Cat.find(function(err, cats) {
        if (err) reject(err);
        resolve(cats);
      }).sort({ _id: -1 });
    });
  }

  cleanDB() {
    return new Promise(resolve => {
      Cat.remove({}, function() {
        resolve('Database was cleaned succesfully');
      });
    });
  }

  addLike(title) {
    return new Promise((resolve, reject) => {
      Cat.findOne({ title: title }, (err, cat) => {
        const likes = cat.likes;

        cat.likes = likes + 1;

        cat.save((err, elem) => {
          resolve(elem);
        });
      });
    });
  }
}

module.exports = DB;
