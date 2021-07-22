require('dotenv').config();
let port = process.env.PORT;
const ejs = require('ejs');
const express = require('express');
const expressSession = require('express-session');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const app = new express();
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => { console.log("connected to database...") });

const validateMiddleWare = require('./middlewares/validatemiddleware');
const authMiddleWare = require('./middlewares/authmiddleware');
const redirectMiddleWare = require('./middlewares/redirectmiddleware');

const newPostController = require('./controllers/newpost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storepost');
const getPostController = require('./controllers/getpost');
const newUserController = require('./controllers/newuser');
const storeUserController = require('./controllers/storeuser');
const loginUserController = require('./controllers/loginuser');
const loginController = require('./controllers/login');
const logoutController = require('./controllers/logoutcontroller');
global.loggedIn = null;
app.use(flash());
app.use(fileUpload());
//app.use('/post/store', validateMiddleWare);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressSession({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
}))
app.use("*", (req, res, next) => {
	global.loggedIn = req.session.user_id;
	next();
})
app.set('view engine', 'ejs'); // set our templating engine to ejs

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleWare, newPostController);
app.post('/post/store', authMiddleWare, storePostController);
app.get('/auth/register', redirectMiddleWare, newUserController);
app.get('/auth/login', redirectMiddleWare, loginController);
app.post('/users/register', redirectMiddleWare, storeUserController);
app.post('/users/login', redirectMiddleWare, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));
if (port == null || port == "") {
	port = 5000
}
app.listen(port, () => {
	console.log("server is listening on port 5000...");
})


// app.get('/about', (req, res) => {
// 	res.render('about');
// })
// app.get('/contact', (req, res) => {
// 	res.render('contact');
// })