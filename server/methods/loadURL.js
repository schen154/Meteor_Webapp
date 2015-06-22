Meteor.methods({
    grabDataFiles: function(dataURL) {
        var result = Meteor.http.get(dataURL, {timeout:30000});
        if(result.statusCode==200) {
            var respJson = JSON.parse(result.content);
            console.log("URL received.");
            return respJson;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    }
});