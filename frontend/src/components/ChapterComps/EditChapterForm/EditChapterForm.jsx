import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const EditChapterForm = ({ chapterId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [chapter, setChapter] = useState(null);
  const [textFile, setTextFile] = useState(null);

  useEffect(() => {
    fetchChapterData();
  }, [chapterId]);

  const fetchChapterData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/books/chapters/${chapterId}`);
      setChapter(response.data);
      form.setFieldsValue({
        chapter_number: response.data.chapter_number,
        name: response.data.name,
        book: response.data.book
      });
    } catch (error) {
      message.error('Failed to fetch chapter data');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      formData.append('chapter_number', values.chapter_number);
      formData.append('name', values.name);
      formData.append('book', chapter.book);
      
      if (textFile) {
        formData.append('text_file', textFile);
      }

      await axios.put(
        `http://localhost:5000/api/books/chapters/${chapterId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      .then(res => res.data)
      .then(data => console.log(data));

      message.success('Chapter updated successfully');
      fetchChapterData();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to update chapter');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !chapter) return <Spin size="large" />;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}
    >
      <Form.Item
        name="chapter_number"
        label="Chapter Number"
        rules={[{ required: true }]}
      >
        <Input type="number" min={1} />
      </Form.Item>

      <Form.Item
        name="name"
        label="Chapter Name"
        rules={[{ required: true}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Text File"
      >
        <Upload
          beforeUpload={(file) => {
            setTextFile(file);
            return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Select Text File</Button>
        </Upload>
      </Form.Item>

      {chapter?.text_file && (
        <div style={{ marginBottom: 16 }}>
          <p>Current file: {chapter.text_file.file_url}</p>
        </div>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Update Chapter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditChapterForm;