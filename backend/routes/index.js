const postController = require('../controllers/postList');
const userController = require('../controllers/userList');

module.exports = (app) => {
    app.route('/signup').post(userController.create);
    app.route('/login').post(userController.create);

    app.route('/users').get(userController.getAll);
    app.route('/user/:id').get(userController.get);
    app.route('/user/:id').put(userController.update);
    app.route('/user/:id').delete(userController.delete);

    app.route('/articles').get(postController.getAll);
    app.route('/article').post(postController.create);
    app.route('/article/:id').get(postController.get);
    app.route('/article/:id').put(postController.update);
    app.route('/article/:id').delete(postController.delete);

    app.use((req, res) => {
      res.status(404).json({url: req.originalUrl, error: 'not found'});
    });
  };
