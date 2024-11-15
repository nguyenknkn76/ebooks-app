const Note = require('../models/note');
const User = require('../models/user');
const {v4: uuidv4} = require('uuid');

const createNote = async () => {
    try {
        await Note.deleteMany();

        const notes = await Note.insertMany([
            {id: uuidv4(), note: 'i luv u', user: '6737735fc31a1715a262181b', important: true},
            {id: uuidv4(), note: 'i miss u', user: '6737735fc31a1715a262181b', important: false},
            {id: uuidv4(), note: 'i hate u', user: '6737735fc31a1715a262181c', important: true}
        ])
        console.log('create note success');
        console.log(notes);
        process.exit();
    } catch (err) {
        console.error('Error insert note data');
        process.exit(1);
    }
}

const createUser = async () => {
    try {
        await User.deleteMany();

        const user = await User.insertMany([
            {id: uuidv4(), name: 'khoi nguyen'},
            {id: uuidv4(), name: 'uoijklzxc'}
        ]);
        console.log('create user success');
        process.exit();
    } catch (err) {
        console.error('Error insert user data');
        process.exit(1);
    }
}

module.exports = {
    createNote, createUser
}