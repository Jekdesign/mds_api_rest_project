


module.exports = (app) => {
  const authController = require('../controllers/authMethod');
  const userController = require('../controllers/userMethod');
  const postController = require('../controllers/articleMethod');
  const withAuth = require('../middleware');
  // auth route
  app.route('/api/signup', withAuth).post(authController.postSignup);
  app.route('/api/login', withAuth).post(authController.postLogin);

  // checking
  app.route('/api/secret', withAuth).get( (req, res) => {
    res.send('The password is potato');
  });
  app.route('/api/checkToken', withAuth).get( (req, res) => {
    res.sendStatus(200);
  });

  // user route
  app.route('/api/users', withAuth).get(userController.getAllUser);
  app.route('/api/user/:id', withAuth).get(userController.getOneUser);
  app.route('/api/user/:id',  withAuth).put(userController.updateUser);
  app.route('/api/user/:id', withAuth).delete(userController.deleteUser);

  // article route
  app.route('/api/articles', withAuth).get(postController.getAllArticle);
  app.route('/api/article', withAuth).post(postController.createArticle);
  app.route('/api/article/:id', withAuth).get(postController.getOneArticle);
  app.route('/api/article/:id', withAuth).put(postController.updateArticle);
  app.route('/api/article/:id', withAuth).delete(postController.deleteArticle);

  app.use((req, res) => {
    res.status(404).json({
      url: req.originalUrl,
      error: 'not found'
    }); 
  });
};