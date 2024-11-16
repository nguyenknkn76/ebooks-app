const Note = require('../models/note');
const User = require('../models/user');
const {v4: uuidv4} = require('uuid');
const mongoose = require('mongoose');
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
            {id: uuidv4(), name: 'khoi nguyen', notes: ['673773986dd79acff9bca5de', ]},
            {id: uuidv4(), name: 'uoijklzxc', notes: []}
        ]);
        console.log('create user success');
        process.exit();
    } catch (err) {
        console.error('Error insert user data');
        process.exit(1);
    }
}

async function createSampleData() {
    try {
      // Tạo dữ liệu mẫu cho User

      await User.deleteMany();
      await Note.deleteMany();
      const user1 = new User({ id: uuidv4(), name: 'John Doe' });
      const user2 = new User({ id: uuidv4(), name: 'Jane Smith' });
  
      await user1.save();
      await user2.save();
  
      // Tạo dữ liệu mẫu cho Note
      const note1 = new Note({
        id: uuidv4(),
        note: 'Sample Note 1',
        important: true,
        user: user1._id
      });
  
      const note2 = new Note({
        id: uuidv4(),
        note: 'Sample Note 2',
        important: false,
        user: user2._id
      });
      const note3 = new Note({
        id: uuidv4(),
        note: 'Sample Note 3',
        important: false,
        user: user2._id
      });
  
      await note1.save();
      await note2.save();
      await note3.save();
  
      // Cập nhật user với các ghi chú
      user1.notes.push(note1._id);
      user2.notes.push(note2._id);
  
      await user1.save();
      await user2.save();
  
      console.log('Sample data created successfully!');
    } catch (error) {
      console.error('Error creating sample data:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  

module.exports = {
    createNote, createUser, createSampleData
}