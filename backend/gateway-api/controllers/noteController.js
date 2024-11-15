const noteClient = require('../services/noteClient');
exports.getNotes = async (req, res) => {
    try {
        const notes = await noteClient.getNotes();
        res.json(notes);
    } catch (error) {
        console.error('error in get notes', error);
        res.status(500).json({message: 'Internal server error NOTE CONTROLLER'});
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await noteClient.getUsers();
        res.json(users);
    } catch(error){
        console.error('error in get Users', error);
        res.status(500).json({message: 'Internal server error NOTE CONTROLLER'});
    }
}