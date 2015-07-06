Meteor.methods({
    grabDataFile: function(url) {
        // Make synchronous http call
        var result = Meteor.http.get(url, {timeout: 30000});
        if (result.statusCode != 200) {
            console.log("Response issue: ", result.statusCode);
            throw new Meteor.Error(result.statusCode);
        }
        var parser = Meteor.npmRequire('csv-parse');
        var parsed = Async.wrap(parser)(result.content, {skip_empty_lines: true});

        //-----save the parsed file-----
        // Create the FS.File instance
        var newFile = new FS.File();

        // Copy the data to a Uint8Array (attachData accepts strings but expects them to be URLs)
        var uinta = new Uint8Array(result.content.length);
        for(var i=0, j=result.content.length; i<j; i++) {
            uinta[i] = result.content.charCodeAt(i);
        }

        // Attach the parsed data file to it.
        newFile.attachData(uinta, {type: 'text/plain'});

        //Get filename from URL
        var origFileName = url.substring(url.lastIndexOf('/')+1);

        //Current date
        var currDate = (new Date()).valueOf();

        // Give it a unique file name
        newFile.name(origFileName+currDate+'.txt');

        // `dataFiles` is an `FS.Collection` instance defined in *FileStorage.js*
        dataFiles.insert(newFile);

        //return parsed file to client
        return parsed;
    }
});
