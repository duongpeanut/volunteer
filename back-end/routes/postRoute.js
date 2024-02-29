const express = require('express');
const router = express.Router();

// const auth = require('../middlewares/auth')
// const authAdmin = require('../middlewares/auth')

const postsController = require('../controllers/postsController');



router.get('/search/:postId', postsController.getPost);
router.post('/search', postsController.getPostByName);

router.get('/list-post', postsController.getListPost);

router.post('/new', postsController.createPost);

router.put('/:postId', postsController.updatePost);

router.delete('/:postId', postsController.deletePost);


//favorite


router.patch('/:postId/favorite', postsController.favoritePost);




module.exports = router;
