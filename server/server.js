const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

// GET

app.get('/api/auth', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
  });
});

app.get('/api/book', (req, res) => {
  const id = req.query.id;

  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(doc);
  });
});

app.get('/api/books', (req, res) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const order = req.query.order;

  Book.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);

      res.status(200).send(doc);
    });
});

app.get('/api/getReviewer', (req, res) => {
  let id = req.query.id;

  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);

    res.json({
      name: doc.name,
      lastname: doc.lastname,
    });
  });
});

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(users);
  });
});

app.get('/api/user-posts', (req, res) => {
  Book.find({ ownerID: req.query.user }).exec((err, docs) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(docs);
  });
});

app.get('/api/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);

    res.sendStatus(200);
  });
});

// POST

app.post('/api/book', (req, res) => {
  const book = new Book(req.body);

  book.save((err, doc) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({
      post: true,
      bookID: doc._id,
    });
  });
});

app.post('/api/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false });

    res.status(200).json({
      user: doc,
      success: true,
    });
  });
});

app.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res
        .status(400)
        .json({ isAuth: false, message: "Email wasn't found" });

    user.comparePasswords(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(401).send({
          isAuth: false,
          message: 'Wrong password!',
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email,
        });
      });
    });
  });
});

// PUT

app.put('/api/book', (req, res) => {
  Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);

    res.json({
      doc,
      success: true,
    });
  });
});

// DELETE

app.delete('/api/book', (req, res) => {
  const id = req.query.id;

  Book.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);

    res.json(true);
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening port ${port}...`);
});
