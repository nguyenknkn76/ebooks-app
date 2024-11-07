const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './proto/book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const client = new bookProto.BookService('localhost:50051', grpc.credentials.createInsecure());

module.exports = client;
