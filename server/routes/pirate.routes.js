const PirateController = require('../controllers/pirate.controller');

module.exports = app => {
    app.get('/api/pirates',PirateController.readAll);
    app.get('/api/pirates/:id',PirateController.readOne);
    app.post('/api/pirates',PirateController.create);
    app.patch('/api/pirates/:id',PirateController.update);
    app.delete('/api/pirates/:id',PirateController.delete);

}