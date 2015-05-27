Meteor.startup(function() {

  Factory.define('job', Jobs, {
    name: function() { return Fake.sentence(); },
    rating: function() { return _.random(1, 5); }
  });

  if (Jobs.find({}).count() === 0) {

    _(10).times(function(n) {
      Factory.create('job');
    });

  }

});
