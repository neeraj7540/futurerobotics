const db = require('./db');

module.exports = {
  db: db.development,
  userFilePath: 'public/images/users/',
  categoriesFilePath: 'public/images/categories/',
  defaultImage: 'public/images/default/main.png',
  defaultThumb: 'public/images/default/default.png',
  eventFilePath: 'public/images/events/',
  partyFilePath: 'public/images/parties/',
  serviceFilePath: 'public/images/service/',
  sponserFilePath: 'public/images/sponsers/',
  adFilePath: 'public/images/ad/',
  festivitiesFilePath:'public/images/festivities/',
  galleryFilePath:'public/images/gallery/',
  cLinksFilePath:'public/images/cLinks/',
  touristFilePath:'public/images/tourist/',
  userFilePath: 'public/images/users/',
  jwtToken: 'hiliteMd',
  saltRounds: 10,
  baseUrl: 'localhost:4100'
 
};