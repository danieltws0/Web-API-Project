const db = require('../database');

class Cities {
  static retrieveAll (callback) {//get list of cities stored in db
    db.query('SELECT city_name from cities', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (city, callback) {//insert to table of cities in db
    db.query('INSERT INTO cities (city_name) VALUES ($1)', [city], function (err, res) {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Cities;