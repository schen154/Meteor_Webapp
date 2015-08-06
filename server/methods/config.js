Meteor.methods({
    createConfig: function(data_name, meta_name){
        //create the config file
        var newFile = new FS.File();
        //give it the same name as the datafile
        newFile.name(data_name+'.yaml');

        //get the content ready
        var results = 'results_directory: ' + '../../../private/results/results_' + data_name + '.txt\n';
        var data_path = 'data_path: ' + '../../../private/user_data/' + data_name + '.txt\n';
        var meta_path = 'feature_metadata_path: ' + '../../../private/user_data/' + meta_name + '.txt\n';
        var data_label = 'data_label:';
        var ignored_features = 'to_drop';
        var response_feature = 'response: ' + Session.get('selectOutput');
        var mode = 'mode: ' + Session.get('mode_radio');
        var vim_score = 'vim_score: MeanDecreaseAccuracy';
        var ntree = 'ntree: ' + Session.get('paraNo1');
        var mtry = 'mtry: ' + Session.get('paraNo2');
        var refuse_subsets = 'refuse_subsets: ' + Session.get('paraNo3');
        var refuse_forests = 'refuse_forests: ' + Session.get('paraNo4');
    }
});