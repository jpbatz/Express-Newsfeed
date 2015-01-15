// TODO
var NewsItem = require('./models/news');

app.get('/news/:id', function(req, res) {
  NewsItem.find({
    "_id": req.params.id
  }, function(err, news) {
    if (err) {
      throw err;
    }
    else {
      var locals = {
        newsItem: news[0]
      };
      res.render('./news', locals);
    }
  });
});

app.get('/new_news', ensureAuthenticated, function(req, res) {
  res.render('./new_news');
});

app.post('/news', ensureAuthenticated, function(req, res) {
  var news = NewsItem({
    "title": req.body.title,
    "author": req.body.author,
    "body": req.body.body
  });

  news.save(function(err) {
    if (err) {
      throw err;
    }
    else {
      res.redirect('/'); // Can't pass locals in to redirect
    }
  });
});

app.get('/news/:id/edit', ensureAuthenticated, function(req, res) {
  NewsItem.find({
    "_id": req.params.id
  }, function(err, news) {
    if (err) {
      throw err;
    }
    else {
      var locals = {
        newsItem: news[0]
      };
      res.render('./edit_news', locals);
    }
  });
});

app.put('/news/:id', ensureAuthenticated, function(req, res) {
  NewsItem.update({
    "_id": req.params.id
  }, {
    "title": req.body.title,
    "author": req.body.author,
    "body": req.body.body
  }, function(err) {
    if (err) {
      throw err;
    }
    else {
      res.redirect('/news/' + req.params.id);
    }
  });
});

app.delete('/news/:id', ensureAuthenticated, function(req, res) {
  NewsItem.remove({
    "_id": req.params.id
  }, function(err) {
    if (err) {
      throw err;
    }
    else {
      res.redirect('/');
    }
  });
});