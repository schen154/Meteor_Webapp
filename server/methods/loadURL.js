Meteor.methods({
    grabDataFiles: function(URLs) {
        // Keep track of each job in an array
        var futures = _.map(URLs, function(url) {
            // Set up a future for the current job
            var future = new Future();
            // A callback so the job can signal completion
            var onComplete = future.resolver();
            /// Make async http call
            Meteor.http.get(url, function(error, result) {
                if(error){
                    console.log("Response issue: ", result.statusCode);
                    throw new Meteor.Error(result.statusCode);
                }
                else{
                    //wrap CSV parser
                    var CSV = Meteor.npmRequire('csv-string');
                    var parse = Meteor.wrapAsync(CSV.parse);
                    var respCSV = parse(result.content);
                    console.log("URL received.");
                    return respCSV;
                }
                onComplete(error, result);
            });
            return future;
        });
        Future.wait(futures);
        return _.invoke(futures, 'get');
    }
});