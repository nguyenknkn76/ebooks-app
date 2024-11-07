const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './protos/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const client = new bookProto.BookService('localhost:50053', grpc.credentials.createInsecure());

module.exports = client;
