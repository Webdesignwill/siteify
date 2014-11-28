
var relations = require('relations');

module.exports = function (app, config) {

  // Use Mongoose store
  relations.use(relations.stores.mongoose);

  relations.define('siteify', {
    owner : ['all']
  });

  relations.define('pages', {
    admin : ['create', 'remove', 'update', 'delete'],
    owner : ['create', 'remove', 'update', 'delete']
  });

  relations.define('users', {
    admin : ['create', 'remove', 'update', 'delete'],
    owner : ['create', 'remove', 'update', 'delete']
  });

  /* Will being the userID */
  // relations.pages('%s is the owner of %s', 'Will', 'homepage');
  // relations.pages('%s is a subscriber of %s', 'James', 'homepage');

  // relations.pages('What is %s the owner of?', 'Will', function (err, pages) {
  //   console.log('Will is the owner of', pages);
  // });

  // relations.pages('Is %s the owner of %s?', 'Will', 'aboutpage', function (err, result) {
  //   console.log('Is Will the owner of homepage? ', result);
  // });

  // relations.pages('Is %s an %s?', 'Will', 'owner', function (err, result) {
  //   console.log('The result', result);
  // });

  // relations.pages('Who is the owner of %s?', 'homepage', function (err, result) {
  //   console.log('The owner of homepage is ', result);
  // });

  // relations.pages('Describe what %s can do', 'Will', function (err, map) {
  //   console.log('Will can', map);
  // });

};