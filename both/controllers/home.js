HomeController = AppController.extend({
    waitOn: function() {
        return this.subscribe('jobs');
    },
    data: {
        items: Jobs.find({})
    },
    onAfterAction: function () {
        Meta.setTitle('Home');
    }
});

HomeController.events({
    'click [data-action=doSomething]': function (event, template) {
        event.preventDefault();
    }
});
