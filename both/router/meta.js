if(Meteor.isClient) {
  Meta.config({
      options: {
        // Meteor.settings[Meteor.settings.environment].public.meta.title
        title: 'Visual Analytics',
        suffix: 'Feature Selection Tool'
      }
  });
}
