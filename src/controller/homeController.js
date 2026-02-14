
import { response } from "express";
import pool from "../config/connectDB";   
import multer from "multer";
// import path from 'path';


let getHomepage = async (req, res) => {

  // query database
  const [rows, fields] = await pool.execute(
      'SELECT * FROM users'
  );
  
 return res.render('index.ejs', {dataUser: rows, test: 'abc string test'} ) //<=======


};

let getDetailPage = async (req, res) => {
    let id = req.params.userId;
    let [user] = await pool.execute(`select * from users where id = ?`, [id])

    return res.send(JSON.stringify(user))

};

let createNewUser = async (req, res) => {
    console.log('check request: ', req.body);

    let {firstName, lastName, email, address} = req.body;

    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
         [firstName, lastName, email, address]
        );

    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;

    await pool.execute('delete from users where id = ?', [userId]);

    return res.redirect('/');

}

let editUser = async (req, res) => {
    let id = req.params.id;

    let [user] = await pool.execute('Select * from users where id = ?', [id]);

    return res.render('update.ejs', {dataUser: user[0]}); // x <- y y gán cho x
}

let postUpdateUser = async (req, res) => {
    let {firstName, lastName, email, address, id} = req.body;

    await pool.execute('update users set firstName=?, lastName=?, email=?, address=? where id =?',
        [firstName, lastName, email, address, id]
    );
    console.log('check request: ', req.body);
     return res.redirect('/');
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadfile.ejs');

}

//Fix
const upload =multer().single('profile_pic');

//===============

/*
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;

*/

let handleUploadFile = async (req, res) => {

    //File Validation and Upload

       // 'profile_pic' is the name of our file input field in the HTML form
     console.log(req.file);

     upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });

}


module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser,
    editUser, postUpdateUser, getUploadFilePage,
    handleUploadFile
}