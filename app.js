const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port = 80;

//Define Mongoose schema

const ContactSchema = new mongoose.Schema({
    name: String,
    Phone: String,
    email: String,
    address: String,
    desc: String,
});

const Contact = mongoose.model('Contact', ContactSchema);





// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item is set to dataBase")

    }).catch(() => {
        res.status(404).send("Item was not saved to data base")
    })
    // res.status(200).render('contact.pug');
})
// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});