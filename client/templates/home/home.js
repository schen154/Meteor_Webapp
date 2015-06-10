

Template.home.rendered = function() {
    $(".my_select_box").chosen({
        display_disabled_options: true,
        display_selected_options: true,
        disable_search_threshold: 10,
        no_results_text: "Oops, nothing found!",
        width: "25%",
    });
};
Template.home.events({
    'click #slide-menu': function(){
        $('.list-group').fadeOut(0.1);
        $('.mini-menu').fadeIn();

    },
    'click .mini-menu': function(){
        $('.mini-menu').fadeOut(0.1);
        $('.list-group').fadeIn();

    }


});


