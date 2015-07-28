Meteor.methods({
    grabDataFile: function(url){
        // Make synchronous http call
        var result = Meteor.http.get(url, {timeout: 30000});
        if (result.statusCode != 200) {
            console.log("Response issue: ", result.statusCode);
            throw new Meteor.Error(result.statusCode);
        }
        var parser = Meteor.npmRequire('csv-parse');
        try{
            //create parsed file
            var parsed = Async.wrap(parser)(result.content, {skip_empty_lines: true});
        }catch(err){
            throw new Meteor.Error('csv-parse-fail', err.message);
        }
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
        var fileName = origFileName+currDate;
        Meteor.set('fileName', fileName);
        newFile.name(fileName+'.txt');

        // `dataFiles` is an `FS.Collection` instance defined in *FileStorage.js*
        dataFiles.insert(newFile);

        //return parsed file to client
        return parsed;
    },
    analyzeData: function(data){
        var missingCol;
        var totalNum = 0;
        var rows = [];
        var columns = [];
        for(i = 0; i < data.length; i++){
            missingCol = _.map(data[i], function(str, index){return [_.contains(["na", "", "nan", "null"], str.toLowerCase().trim()), index]});
            columns[i] = _.filter(missingCol, function(bool){return bool[0]});
            rows[i] = _.size(columns[i]);
            for(j=0; j<rows[i]; j++){
                columns[i][j] = columns[i][j][1]+1;
            }
            totalNum = totalNum + rows[i];
        }
        return [rows, columns, totalNum];
    }
});
