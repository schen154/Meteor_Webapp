Jobs = new Mongo.Collection('jobs');

Jobs.helpers({

});

Jobs.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
