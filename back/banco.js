var mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "tablenode"
});


// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Conectado ao banco!")

//     var sql = "select * from tabelas;"

//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log(result)
//     })
// });

// con.end();

module.exports = con