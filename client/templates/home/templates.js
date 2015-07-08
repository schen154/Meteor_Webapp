//for input url
Template.url.events = {
    'click #submitURL': function (){
        console.log("Recent url received!");
        $('#submitURL').attr('disabled','true').val('loading...');
        _.each(['inputData', 'inputMeta'], function(elementId) {
            Meteor.call('grabDataFile', $('#' + elementId).val(), function(err, output){
                if(err){
                    window.alert("Error: " + err.reason);
                    console.log("Error occurred on receiving data on server. ", err);
                }else{
                    console.log("Output: ", output);
                    Session.set(elementId, output);
                    //analyze data
                    Meteor.call('analyzeData', Session.get('inputData'), function(err, result){
                        if(err){
                            window.alert("Error: " + err.reason);
                            console.log("Error occurred on analyzing data. ", err);
                        }else{
                            console.log("Missing Values: ", result);
                            Session.set('missing', result);
                        }
                    });
                }
                $('#submitURL').removeAttr('disabled').val('Submit');
            });
        });
        Session.set('step', 'datainputs');
    }
};



//for inspect inputs
Template.datainputs.rendered = function(){

};
Template.datainputs.events({
    'click #go_set_para': function(){
        Session.set('step', 'select');
    }

    //'click #headingFour': function(){
   //     _.each(['inputData', 'inputMeta'], function(elementId) {
    //        console.log("Total number of missing values: ", Session.get(elementId));
    //    });
   // }
});





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
Template.select.events({
    'click #go_set_algo': function(){
        Session.set('step', 'parameters');
    }
});




//for algorithm parameters
Template.parameters.events({
   'click #go_review': function(){
       Session.set('step', 'review');
   }
});





//for review
Template.review.events({
    'click #go_to_monitor': function(){
        Session.set('step', 'monitor');
    }
});




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

    'click #comments': function() {
        $("#input_comment").modal();
    },

    'click #inputs': function(){
        $("#view_inputs").modal();
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
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
};
Template.results.events({
    'click #delete': function(){
        $("#delete_warning").modal();
    },

    'click #comments': function(){
        $("#input_comment").modal();
    },

    'click #details': function(){
        $("#view_details").modal();
    }
});