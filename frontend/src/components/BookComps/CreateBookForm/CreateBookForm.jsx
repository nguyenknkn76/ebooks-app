import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BookService from '../../../services/BookService';
import './CreateBookForm.scss';

const { TextArea } = Input;
const { Option } = Select;

const CreateBookForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    try {
      const [authorsData, genresData] = await Promise.all([
        BookService.getAllAuthors(),
        BookService.getAllGenres()
      ]);
      setAuthors(authorsData);
      setGenres(genresData);
    } catch (error) {
      message.error('Failed to fetch metadata');
    }
  };

  const handleImageChange = ({ file }) => {
    if (file.status === 'uploading') {
      return;
    }
    if (file.status === 'done') {
      setImageFile(file.originFileObj);
      // Create preview URL
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => setPreviewImage(reader.result);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const bookData = {
        ...values,
        cover_image: imageFile
      };
      await BookService.createBookWithCover(bookData);
      message.success('Book created successfully');
      form.resetFields();
      setPreviewImage('');
      setImageFile(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to create book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-book-form">
      <div className="create-book-form__cover">
        <div className="cover-preview">
          {previewImage ? (
            <img src={previewImage} alt="Cover preview" />
          ) : (
            <div className="upload-placeholder">
              <p>Book Cover</p>
            </div>
          )}
        </div>
        <Upload
          accept="image/*"
          showUploadList={false}
          onChange={handleImageChange}
          customRequest={({ onSuccess }) => onSuccess('ok')}
        >
          <Button icon={<UploadOutlined />}>Upload Cover</Button>
        </Upload>
      </div>

      <div className="create-book-form__content">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          validateTrigger="onBlur"
        >
          <div className="form-row">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Title is required' }]}
              className="short-input"
            >
              <Input placeholder="Enter book title" />
            </Form.Item>

            <Form.Item
              name="author"
              label="Author"
              rules={[{ required: true, message: 'Author is required' }]}
              className="short-input"
            >
              <Select placeholder="Select author">
                {authors.map(author => (
                  <Option key={author.id} value={author.id}>
                    {author.pen_name || author.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              initialValue="draft"
              className="short-input"
            >
              <Select>
                <Option value="draft">Draft</Option>
                <Option value="published">Published</Option>
                <Option value="completed">Completed</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="genres"
            label="Genres"
            rules={[{ required: true, message: 'At least one genre is required' }]}
            className="ant-form-item-full"
          >
            <Select mode="multiple" placeholder="Select genres">
              {genres.map(genre => (
                <Option key={genre.id} value={genre.id}>
                  {genre.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            className="ant-form-item-full"
          >
            <TextArea rows={4} placeholder="Enter book description" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              disabled={!imageFile}
            >
              Create Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateBookForm;