var { Pool } = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:subzero0@localhost:5432/weather-db';
const SSL = process.env.NODE_ENV === 'production';


class Database {
  constructor () {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING, //pass in connection string and ssl settings
      ssl: SSL
    });

    this._pool.on('error', (err, client) => {
      console.error('Unexpected error on idle PostgreSQL client.', err);
      process.exit(-1);
    });

  }

  query (query, ...args) {
    this._pool.connect((err, client, done) => {//postgresql connection
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];

      client.query(query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({ error: 'Database error!!!' }, null);
        }
        console.log("successful query with no erros");
        callback({}, res.rows);//return rows from database
      });
    });

  }

  end () {
    this._pool.end();
  }
}

module.exports = new Database();