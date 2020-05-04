const authController = require('../controllers/authMethod');
const userController = require('../controllers/userMethod');
const postController = require('../controllers/articleMethod');
const withAuth = require('../middleware');


module.exports = (app) => {
  // auth route
  app.route('/api/signup').post(authController.postSignup);
  app.route('/api/login', withAuth).post(authController.postLogin);

  app.get('/api/secret', withAuth, (req, res) => {
    res.send('The password is potato');
  });

  app.get('/api/checkToken', withAuth, (req, res) => {
    res.sendStatus(200);
  });

  // user route
  app.route('/api/users', withAuth).get(userController.getAllUser);
  app.route('/api/user/:id', withAuth).get(userController.getOneUser);
  app.route('/api/user/:id',  withAuth).put(userController.updateUser);
  app.route('/api/user/:id', withAuth).delete(userController.deleteUser);

  // article route
  app.route('/api/articles').get(postController.getAllArticle);
  app.route('/api/article').post(postController.createArticle);
  app.route('/api/article/:id').get(postController.getOneArticle);
  app.route('/api/article/:id').put(postController.updateArticle);
  app.route('/api/article/:id').delete(postController.deleteArticle);

  app.use((req, res) => {
    res.status(404).json({
      url: req.originalUrl,
      error: 'not found'
    }); 
  });
};