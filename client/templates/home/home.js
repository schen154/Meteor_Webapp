Template.home.rendered = function() {};
Template.home.events({
    'click #slide-menu': function(){
        $('.list-group').fadeOut(0.1);
        $('.mini-menu').fadeIn();

    },
    'click .mini-menu': function(){
        $('.mini-menu').fadeOut(0.1);
        $('.list-group').fadeIn();

    },

    'click .list-group-item': function(){
            Session.set('step', $(this)._id);
    }

});

Template.home.helpers({
    whichOne: function () {
        return Template[Session.get('step')]
        // note that we return a Template object, not a string
    }
})



