Template.home.rendered = function() {

};
Template.home.events({
    'click #slide-menu': function(){
        $('.list-group').fadeOut(10);
        $('.mini-menu').fadeIn();
    },
    'click .mini-menu': function(){
        $('.mini-menu').fadeOut();
        $('.list-group').fadeIn();
    }


});