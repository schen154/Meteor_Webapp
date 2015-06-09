Meteor.startup(function() {

    if (Meteor.users.find({}).count() === 0) {
        Accounts.createUser({username: 'mjberry@illinois.edu', email: 'mjberry@illinois.edu', password: 'changeme', profile: {name: 'Matt Berry'}});
        Accounts.createUser({username: 'schen154@illinois.edu', email: 'schen154@illinois.edu', password: 'chsy961022', profile: {name: 'Suyang Chen'}});
        Accounts.createUser({username: 'lauvil@illinois.edu', email: 'lauvil@illinois.edu', password: 'changeme', profile: {name: 'Loretta Auvil'}});
    }

});
