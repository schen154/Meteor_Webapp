Meteor.publishComposite("jobs", function() {
  return {
    find: function() {
      return Jobs.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});
