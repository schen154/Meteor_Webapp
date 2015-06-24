//for input url
Template.url.events = {
    'click #submitURL' : function () {
        console.log("Recent url received!");
        $('#submitURL').attr('disabled','true').val('loading...');
        var URLs = [
            $('#inputData').val(),
            $('#inputMeta').val()
        ];
        Meteor.call('grabDataFiles', URLs, function(err, output) {
            if(err){
                window.alert("Error: " + err.reason);
                console.log("Error occured on receiving data on server. ", err);
            } else {
                console.log("Output: ", output);
                Session.set("Files", output);
            }
            $('#submitURL').removeAttr('disabled').val('Submit');
        });
    }
};



//for multi-select
Template.select.rendered = function() {
    $(".select").chosen({
        display_disabled_options: true,
        display_selected_options: true,
        disable_search_threshold: 10,
        no_results_text: "Oops, nothing found!",
        height: "25%",
        width: "35%"
    });
};




//for monitor(table)
Template.monitor.rendered = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
};
Template.monitor.events({
    'click #delete': function(){
        $("#delete_warning").modal();
    },

    'click #terminate': function(){
        $("#terminate_warning").modal();
    },

    'click #comments': function(){
        $("#input_comment").modal();
    }
});



//for displaying results
Template.results.rendered = function() {
    $('#view').on('click', function () {
        var $btn = $(this).button('loading')
    });

    $('#copy').on('click', function () {
        var $btn = $(this).button('loading')
    });

    $('#error').on('click', function () {
        var $btn = $(this).button('loading')
    })
};
