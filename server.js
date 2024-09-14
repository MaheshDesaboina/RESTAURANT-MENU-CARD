const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

let users = [];
let orders = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.redirect('/login');
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});


app.post('/loginSubmit', (req, res) => {
    const { username, password } = req.body;


    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.render('dashboard', { username: user.username, qrCode: '/images/qrcode.png' });
    } else {
        res.send('Invalid username or password.');
    }
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
});

app.post('/signupSubmit', (req, res) => {
    const { username, email, password } = req.body;


    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        res.send('Username already exists.');
    } else {
        users.push({ username, email, password });
        res.redirect('/login');
    }
});


app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/menu.html'));
});

app.post('/placeOrder', (req, res) => {
    const { items } = req.body;

    const cartItems = JSON.parse(items);

    let totalCost = 0;
    cartItems.forEach(item => {
        totalCost += item.price * item.quantity;
    });


app.post('/placeOrder', (req, res) => {
    const { items } = req.body;


    const cartItems = JSON.parse(items);

    let totalCost = 0;
    cartItems.forEach(item => {
        totalCost += item.price * item.quantity;
    });

    
    orders.push({ items: cartItems, totalCost });

    res.render('order-successful', { totalCost: totalCost.toFixed(2) });
});

    
    orders.push({ items: cartItems, totalCost });

    
    res.render('order-successful', { totalCost: totalCost.toFixed(2) });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
