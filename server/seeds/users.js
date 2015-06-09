Meteor.startup(function() {

    if (Meteor.users.find({}).count() === 0) {
        Accounts.createUser({username: 'mjberry@illinois.edu', email: 'mjberry@illinois.edu', password: 'changeme', profile: {name: 'Matt Berry'}});
        Accounts.createUser({username: 'schen154@illinois.edu', email: 'schen154@illinois.edu', password: '961022', profile: {name: 'Suyang Chen'}});

    }

});
