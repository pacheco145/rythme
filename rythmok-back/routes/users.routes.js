const express= require('express');
const controllerUser =require('../controllers/users.controller');
const controllerEvent =require('../controllers/events.controller');

const router = express.Router();
router.get('/' , controllerUser.getUsers);
router.get('/:id',controllerUser.userGetById);
router.post('/:id/add-friend/:idFriend', controllerUser.postAddFriend);
router.post('/:id/delete-friend/:idFriend', controllerUser.postDeleteFriend);
router.post('/:id/add-favourite/:idEvent', controllerEvent.postAddFavourite)
router.delete('/:id/delete-favourite/:idEvent', controllerEvent.postDeleteFavourite)
router.post('/:id/buy/:idEvent', controllerEvent.postAddTicket)


module.exports = router;
