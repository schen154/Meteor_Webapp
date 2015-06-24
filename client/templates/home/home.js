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

    'click .list-group-item, .go-set-para': function(event){
        Session.set('step', $(event.target).attr('id'));
    }

});

Template.home.helpers({
    whichOne: function () {
        return Template[(Session.get('step') || 'url')];
    }
});



