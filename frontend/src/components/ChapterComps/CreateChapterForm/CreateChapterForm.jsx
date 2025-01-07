import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import BookService from '../../../services/BookService';
import './CreateChapterForm.scss';

const CreateChapterForm = ({ bookId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const chapterData = {
        chapter_number: parseInt(values.chapter_number),
        name: values.name,
        book: bookId
      };

      await BookService.createChapter(chapterData);
      message.success('Chapter created successfully');
      form.resetFields();
      if (onSuccess) onSuccess();
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

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
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