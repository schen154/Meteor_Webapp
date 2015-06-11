Router.route('/', {
  name: 'home'
});
Router.route('/url', function () {
  this.render('url');
});

Router.route('/select', function () {
  this.render('select');
});

Router.route('/parameters', function () {
  this.render('parameters');
});

Router.route('/review', function () {
  this.render('reveiw');
});

Router.route('/monitor', function () {
  this.render('monitor');
});

Router.route('/results', function () {
  this.render('results');
});