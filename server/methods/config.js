Meteor.methods({
    createConfig: function(fileName){
        //create the config file
        var newFile = new FS.File();
        //give it the same name as the datafile
        newFile.name(fileName+'.yaml');

        //get the content ready
        
    }
});