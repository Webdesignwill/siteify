
var relations = require('relations');
relations.use(relations.stores.mongoose);

module.exports = function (app, config) {
  relations.define('pages', {
    owner : ['create', 'remove', 'update', 'delete']
  });

  /* Will being the userID */
  relations.pages('%s is the owner of %s', 'Will', 'homepage');

  // relations.pages('What is %s the owner of?', 'Will', function (err, pages) {
  //   console.log('Will is the owner of', pages);
  // });

  // relations.pages('Is %s the owner of %s?', 'Will', 'aboutpage', function (err, result) {
  //   console.log('Is Will the owner of homepage? ', result);
  // });

  relations.pages('Who is the owner of %s?', 'homepage', function (err, result) {
    console.log('The owner of homepage is ', result);
  });

  // relations.pages('Describe what %s can do', 'Will', function (err, map) {
  //   console.log('Will can', map);
  // });

};