
import connection from "../config/connectDB";   


let getHomepage = (req, res) => {

   // A simple SELECT query
   let data = []; //<==================
connection.query(
  'SELECT * FROM `users`',
  function (err, results, fields) {

    results.map((row) => {
    data.push({
        id: row.id,
        email: row.Email,
        firstName: row.firstName,
        lastName: row.lastName
    })
}); //<==============

   return res.render('index.ejs', {dataUser: JSON.stringify(data)} ) //<=======
    
}
);

};

module.exports = {
    getHomepage
}