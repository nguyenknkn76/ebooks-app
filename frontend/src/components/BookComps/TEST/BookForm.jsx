import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button, Upload, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const BookForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchAuthorsAndGenres();
  }, []);

  const fetchAuthorsAndGenres = async () => {
    try {
      const [authorsRes, genresRes] = await Promise.all([
        axios.get('http://localhost:5000/api/books/authors'),
        axios.get('http://localhost:5000/api/books/genres')
      ]);
      setAuthors(authorsRes.data);
      setGenres(genresRes.data);
    } catch (error) {
      message.error('Failed to fetch data');
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(values).forEach(key => {
        if (key === 'genres') {
          formData.append('genres', JSON.stringify(values.genres));
        } else if (key !== 'cover_image') {
          formData.append(key, values[key]);
        }
      });

      // Append file if exists
      if (values.cover_image?.[0]?.originFileObj) {
        formData.append('cover_image', values.cover_image[0].originFileObj);
      }

      const response = await axios.post('http://localhost:5000/api/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      message.success('Book created successfully');
      form.resetFields();
      setImageUrl('');
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to create book');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  };

  const handleChange = (info) => {
    if (info.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="author"
        label="Author"
        rules={[{ required: true }]}
      >
        <Select>
          {authors.map(author => (
            <Option key={author.id} value={author.id}>
              {author.pen_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="genres"
        label="Genres"
        rules={[{ required: true }]}
      >
        <Select mode="multiple">
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
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="publish_year"
        label="Publish Year"
        rules={[{ type: 'number', min: 1800, max: 2100 }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        initialValue="draft"
      >
        <Select>
          <Option value="draft">Draft</Option>
          <Option value="published">Published</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="cover_image"
        label="Cover Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true }]}
      >
        <Upload
          name="cover_image"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="cover" style={{ width: '100%' }} />
          ) : (
            'Upload Cover'
          )}
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Create Book
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookForm;