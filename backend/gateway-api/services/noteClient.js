const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const PROTO_PATH = './protos/note.proto';
const packageDefenition = protoLoader.loadSync(PROTO_PATH);
const noteProto = grpc.loadPackageDefinition(packageDefenition).note;
const client  = new noteProto.NoteService('localhost:50059', grpc.credentials.createInsecure());

const getNotes = () => {
    return new Promise((resolve, reject) => {
        client.GetNotes({}, (err, res) => {
            if(err) return reject(err);
            resolve(res.notes);
        })
    })
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        client.GetUsers({}, (err, res) => {
            if(err) return reject(err);
            resolve(res.users)
        })
    })
}
module.exports = {getNotes, getUsers};