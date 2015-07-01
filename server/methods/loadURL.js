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

        //---save the parsed file---
        // Create the FS.File instance
        var newFile = new FS.File();

        // Attach the parsed data file to it.
        newFile.attachData(parsed, {type: 'text/plain'});

        // Give it a file name
        newFile.name('elementID.txt');

        // `dataFiles` is an `FS.Collection` instance defined in *FileStorage.js*
        dataFiles.insert(newFile);

        //return parsed file to client
        return parsed;
    }
});