Meteor.methods({
    grabDataFile: function(url) {
        // Make synchronous http call
        console.log("This doesn't print out!!  T^T");
        var result = Meteor.http.get(url, {timeout: 30000});
        if (result.statusCode != 200) {
            console.log("Response issue: ", result.statusCode);
            throw new Meteor.Error(result.statusCode);
        }
        var parser = Meteor.npmRequire('csv-parse');
        var parsed = Async.wrap(parser)(result.content, {skip_empty_lines: true});

        //---save the parsed file---
        // Create the FS.File instance
        var newFile = new FS.File();

        // Attach the parsed data file to it.
        newFile.attachData(result.content, {type: 'text/plain'});

        //Get filename from URL
        var origFileName = url.substring(url.lastIndexOf('/')+1);

        //Current date
        var currDate = (new Date()).valueOf();

        // Give it a unique file name
        newFile.name(origFileName+CurrDate+'.txt');

        // `dataFiles` is an `FS.Collection` instance defined in *FileStorage.js*
        dataFiles.insert(newFile);

        //return parsed file to client
        return parsed;
    }
});
