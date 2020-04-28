const authController = require('../controllers/authMethod');
const userController = require('../controllers/userMethod');
const postController = require('../controllers/articleMethod');

module.exports = (app) => {
  // auth route
  app.route('/signup').post(authController.postSignup);
  app.route('/login').post(authController.postLogin);

  // user route
  app.route('/users').get(userController.getAllUser);
  app.route('/user/:id').get(userController.getOneUser);
  app.route('/user/:id').put(userController.updateUser);
  app.route('/user/:id').delete(userController.deleteUser);

  // article route
  app.route('/articles').get(postController.getAllArticle);
  app.route('/article').post(postController.createArticle);
  app.route('/article/:id').get(postController.getOneArticle);
  app.route('/article/:id').put(postController.updateArticle);
  app.route('/article/:id').delete(postController.deleteArticle);

  app.use((req, res) => {
    res.status(404).json({
      url: req.originalUrl,
      error: 'not found'
    });
  });
};
