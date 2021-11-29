const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
 hostname:'Pruevalocal',
 user: 'root',
database: 'gym',
multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('Ahora estamos en Linea');
    }
  });

  module.exports = mysqlConnection;