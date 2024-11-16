const gprc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user')
const connectDB = require('./config/db');
const {createUser, createNote, createSampleData} = require('./sample-data/sampleData');

connectDB();
const PROTO_PATH = './protos/note.proto';
const packageDefenition = protoLoader.loadSync(PROTO_PATH);
const noteProto = gprc.loadPackageDefinition(packageDefenition).note;

const getNotes = async (req, res) => {
    console.log('this is get note');
    try {
        const notes = await Note.find();
        console.log(notes);
        const noteList = notes.map(note => ({
            id: note._id.toString(),
            note: note.note,
            important: note.important,
            user: note.user.toString()
        }))
        res(null, {notes: noteList});
    } catch (error) {
        res(error, null);
    }
}

const getUsers = async (req, res) => {
    console.log('this is get user');
    try {
        const users = await User.find({});
        console.log(users);
        const userList = users.map(user => ({
            id: user._id.toString(),
            name: user.name,
            notes: user.notes
        }));
        res(null, {users: userList});
    } catch (error) {
        res(error, null);
    }
}
const main = () => {
    const server = new gprc.Server();
    const   PORT = '0.0.0.0:50059';
    server.addService(noteProto.NoteService.service, {
        GetNotes: getNotes,
        GetUsers: getUsers
    })
    server.bindAsync(PORT, gprc.ServerCredentials.createInsecure(), ()=> {
        console.log(`Note service running at ${PORT}`);
    })
}
main();
// createUser();
// createNote();
// createSampleData();