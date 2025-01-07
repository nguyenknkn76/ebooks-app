import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Upload, message, Spin } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const EditBookForm = ({ bookId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchData();
  }, [bookId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [authorsRes, genresRes, bookRes] = await Promise.all([
        axios.get('http://localhost:5000/api/books/authors'),
        axios.get('http://localhost:5000/api/books/genres'),
        axios.get(`http://localhost:5000/api/books/book/${bookId}`)
      ]);

      setAuthors(authorsRes.data);
      setGenres(genresRes.data);
      setBook(bookRes.data);
      
      // Set initial form values
      form.setFieldsValue({
        title: bookRes.data.title,
        author: bookRes.data.author.id,
        genres: bookRes.data.genres.map(g => g.id),
        description: bookRes.data.description,
        publish_year: bookRes.data.publish_year,
        status: bookRes.data.status
      });

      if (bookRes.data.cover_img?.file_url) {
        setImageUrl(bookRes.data.cover_img.file_url);
      }
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      Object.keys(values).forEach(key => {
        if (key === 'genres') {
          formData.append('genres', JSON.stringify(values.genres));
        } else if (key !== 'cover_image') {
          formData.append(key, values[key]);
        }
      });

      if (values.cover_image?.[0]?.originFileObj) {
        formData.append('cover_image', values.cover_image[0].originFileObj);
      }

      await axios.put(`http://localhost:5000/api/books/${bookId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      message.success('Book updated successfully');
      fetchData(); // Refresh data
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to update book');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
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

  if (loading && !book) return <Spin size="large" />;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="author" label="Author" rules={[{ required: true }]}>
        <Select>
          {authors.map(author => (
            <Option key={author.id} value={author.id}>
              {author.pen_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="genres" label="Genres" rules={[{ required: true }]}>
        <Select mode="multiple">
          {genres.map(genre => (
            <Option key={genre.id} value={genre.id}>
              {genre.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="description" label="Description">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="publish_year"
        label="Publish Year"
        rules={[
          {
            type: 'number',
            transform: (value) => Number(value),
            min: 1800,
            max: 2100,
            message: 'Year must be between 1800 and 2100'
          }
        ]}
      >
        <Input 
          type="number" 
          min={1800} 
          max={2100}
          // parser={value => parseInt(value || '0', 10)}
        />
      </Form.Item>

      <Form.Item name="status" label="Status">
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
            'Change Cover'
          )}
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Update Book
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditBookForm;