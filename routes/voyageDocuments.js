const express = require('express');
const router = express.Router();
const voyageDocumentsController = require('../controllers/voyageDocumentsController');

module.exports = (upload) => {
    router.post('/uploadDocument', upload.single('file'), voyageDocumentsController.uploadDocument);
    router.get('/getVoyageDocuments/:voyageId', voyageDocumentsController.getVoyageDocuments);
    router.delete('/delete/:id', voyageDocumentsController.deleteVoyageDocument);

    return router;
};