Meteor.startup(function() {

    if (Meteor.users.find({}).count() === 0) {
        Accounts.createUser({username: 'mjberry@illinois.edu', email: 'mjberry@illinois.edu', password: 'changeme', profile: {name: 'Matt Berry'}});
    }

});
