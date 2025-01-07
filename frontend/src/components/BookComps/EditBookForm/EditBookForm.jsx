import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './EditBookForm.scss';

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
      setImageUrl(bookRes.data.cover_img?.file_url);

      form.setFieldsValue({
        title: bookRes.data.title,
        author: bookRes.data.author.id,
        genres: bookRes.data.genres.map(g => g.id),
        description: bookRes.data.description,
        status: bookRes.data.status
      });
    } catch (error) {
      message.error('Failed to fetch book data');
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

  if (loading) return <Spin size="large" />;

  return (
    <div className="edit-book-form">
      <div className="edit-book-form__cover">
        <img src={imageUrl || '/default-cover.png'} alt="Book cover" />
        <Upload
          name="cover_image"
          action={`http://localhost:5000/api/books/${bookId}/cover`}
          onChange={({ file }) => {
            if (file.status === 'done') {
              setImageUrl(file.response.file_url);
              message.success('Cover uploaded successfully');
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Change Cover</Button>
        </Upload>
      </div>

      <div className="edit-book-form__editable">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
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
                  {author.pen_name || author.name}
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
            name="status"
            label="Status"
          >
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="published">Published</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form>
      </div>

      <div className="edit-book-form__stats">
        <div className="stat-item">
          <label>Average Rating</label>
          <div className="stat-value">
            <span className="stars">{'★'.repeat(Math.round(book?.avg_rating || 0))}</span>
            <span>({(book?.avg_rating || 0).toFixed(1)})</span>
          </div>
        </div>

        <div className="stat-item">
          <label>Total Views</label>
          <div className="stat-value">{book?.total_views || 0}</div>
        </div>

        <div className="stat-item">
          <label>Monthly Views</label>
          <div className="stat-value">{book?.monthly_views || 0}</div>
        </div>

        <div className="stat-item">
          <label>Followers</label>
          <div className="stat-value">{book?.followers || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default EditBookForm;