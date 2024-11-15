const gprc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user')
const connectDB = require('./config/db');
const {createUser, createNote} = require('./sample-data/sampleData');
const { getUserById } = require('../gateway-api/services/userClient');
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