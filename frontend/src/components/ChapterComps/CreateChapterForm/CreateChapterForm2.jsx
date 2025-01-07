import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BookService from '../../../services/BookService';
import './CreateChapterForm.scss';

const CreateChapterForm = ({ bookId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [textFile, setTextFile] = useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('chapter_number', values.chapter_number);
      formData.append('name', values.name);
      formData.append('book', bookId);
      if (textFile) {
        formData.append('text_file', textFile);
      }

      await BookService.createChapter(formData);
      message.success('Chapter created successfully');
      form.resetFields();
      setTextFile(null);
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to create chapter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-chapter-form">
      <h2>Create New Chapter</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="chapter_number"
          label="Chapter Number"
          rules={[{ required: true, message: 'Please input chapter number' }]}
        >
          <Input type="number" min={1} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Chapter Name"
          rules={[{ required: true, message: 'Please input chapter name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Text File"
          rules={[{ required: true, message: 'Please upload text file' }]}
        >
          <Upload
            beforeUpload={(file) => {
              setTextFile(file);
              return false;
            }}
            maxCount={1}
            onRemove={() => setTextFile(null)}
          >
            <Button icon={<UploadOutlined />}>Select Text File</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            disabled={!textFile}
            block
          >
            Create Chapter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateChapterForm;