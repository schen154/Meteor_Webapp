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
                    if(elementId=='inputData'){
                        //calc total
                        Meteor.call('analyzeData', output, function(err, result){
                            if(err){
                                window.alert("Error: " + err.reason);
                                console.log("Error occurred on analyzing data", err);
                            }else{
                                console.log("Missing rows: ", result[0]);
                                Session.set('missingRow', result[0]);
                                Session.set('missingCol', result[1]);
                                Session.set('totalNum', result[2]);
                            }
                        });
                    }
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
Template.datainputs.helpers({
    summary: function(){
        var total = Session.get('totalNum');
        if(total){
            if(total!=0){
                return "You have values missing. Click below to view details";
            }else{
                return "All good. Click below to view details";
            }
        }else{
            return "Loading...";
        }

    },
    basic: function(){
        var data = Session.get('inputData');
        if(data){
            return "Your data has " + (_.size(data)) + " rows and " + (_.size(data[0])) + " columns.";
        }else{
            return "Loading...";
        }
    },
    missingValues: function(){
        var total = Session.get('totalNum');
        var rows = Session.get('missingRow');
        var columns = Session.get('missingCol');
        var outputStr = "";
        if(total){
            console.log("Missing columns: ", columns);
            for(i=0; i< _.size(rows); i++){
                if(rows[i]!=0){
                    var whichColumns = "";
                    var rowNum = i+1;
                    for(j=0; j<rows[i]; j++){
                        whichColumns = whichColumns + " " + columns[i][j];
                    }
                    outputStr = outputStr + "Row " + rowNum + "\nNumber missing: " + rows[i] + ", " + "at column"
                        + whichColumns + ".\n" ;
                }
            }
            return "Total number of values missing: "+ total + ".\n"  + outputStr;
        }else{
            return "Loading...";
        }


    }
});
Template.datainputs.events({
    'click #go_set_para': function(){
        Session.set('step', 'select');
    }
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
    $(function () {
        var theData = Session.get('inputData');
        var outputList = document.getElementById('selectOutput');
        var item;
        for(i=0; i<theData.length; i++){
            item = document.createElement('option');
            item.text = theData[i];
            outputList.options.add(item);
        }
    });
};
Template.select.helpers({
    features: function(){
        var returnVal = [];
        var theData = Session.get('inputData');
        if (theData) {
           returnVal = _.map(theData[0], function(colName) {return {"name": colName};});
        }
        return returnVal;
    }
});



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