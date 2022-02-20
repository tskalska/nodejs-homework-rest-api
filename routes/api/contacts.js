const express = require('express');
const {authenticate} = require('../../middlewares');
const {add, getAll, getById, deleteById,changeContact,changeFavorite} = require('../../controllers/contacts');

const router = express.Router();

router.get('/', authenticate, getAll);
router.get('/:contactId', authenticate, getById);
router.post("/", authenticate, add);
router.delete('/:contactId', authenticate, deleteById);
router.put('/:contactId', authenticate, changeContact);
router.patch("/:contactId/favorite", authenticate, changeFavorite);

module.exports = router;
