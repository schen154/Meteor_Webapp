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
        return parsed;
    }
});
