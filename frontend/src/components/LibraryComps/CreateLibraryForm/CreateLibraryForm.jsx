import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import BookService from '../../../services/BookService';
import './CreateLibraryForm.scss';

const CreateLibraryForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const loggedin = useSelector(state => state.loggedin);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const libraryData = {
        user: loggedin.user.id,
        name: values.name
      };

      await BookService.createLibrary(libraryData);
      message.success('Library created successfully');
      form.resetFields();
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to create library');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-library-form">
      <h2>Create New Library</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Library Name"
          rules={[{ required: true, message: 'Please input library name' }]}
        >
          <Input placeholder="Enter library name" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
          >
            Create Library
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateLibraryForm;