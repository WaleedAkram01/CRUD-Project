const express = require('express');
const app = express();
const path = require('path');

const userModels = require('./model/user');
//Purpose: To parse the incoming request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Purpose: To set the view engine
//Also:npm i ejs(In the terminal)
app.set('view engine', 'ejs');

//Purpose: To set the static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/read', async (req, res) => {
    let allusers = await userModels.find();
    //Yeh allusers ka data Hm ny Ejs mai bhej dia ta Ky frontend pr dispaly Ho saky.
    res.render("read", { users: allusers })
})
//Delete User
app.get('/delete/:id', async (req, res) => {
    let users = await userModels.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read')
})

//Update User
app.get('/edit/:userid', async (req, res) => {
    let user = await userModels.findOne({ _id: req.params.userid });
    //Hm Uss user Ko Bhej rhy jisy updat ekrna Hai.
    res.render("edit", { user: user })
})

app.post('/update/:userid', async (req, res) => {
    let { name, email, image } = req.body;
    let user = await userModels.findOneAndUpdate({ _id: req.params.userid }, { name, email, image }, { new: true })
    res.redirect('/read');
})

//Nnow we want Jb Koi user form submit krta hai to uska data save hojaye.
app.post('/create', async (req, res) => {
    const { name, email, image } = req.body;
    let createdUser = await userModels.create({
        name: name,
        email: email,
        image: image
    })
    res.send(createdUser);

})

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
})