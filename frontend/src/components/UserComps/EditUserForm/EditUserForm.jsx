import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Button, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserService from '../../../services/UserService';
import './EditUserForm.scss';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../../reducers/LoggedinReducer';

const EditUserForm = ({ userId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await UserService.getUserById(userId);
      setUser(userData);
      setImageUrl(userData.avatar?.file_url);
      
      form.setFieldsValue({
        username: userData.username,
        email: userData.email,
        name: userData.profile?.name,
        phone: userData.profile?.phone,
        address: userData.profile?.address
      });
    } catch (error) {
      message.error('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Add all form fields to FormData
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('name', values.name);
      formData.append('phone', values.phone || '');
      formData.append('address', values.address || '');

      // Handle file upload
      if (values.avatar && values.avatar.length > 0) {
        formData.append('avatar', values.avatar[0].originFileObj);
      }

      // Update user
      await UserService.updateUser(userId, formData);
      message.success('Profile updated successfully');
      
      // Refresh user data
      const updatedUser = await UserService.getUserById(userId);
      setUser(updatedUser);
      setImageUrl(updatedUser.profile?.avatar?.file_url);

      // Update redux state if needed
      dispatch(setLoggedIn({
        user: updatedUser,
        access_token: localStorage.getItem('token')
      }));

    } catch (error) {
      console.error('Update error:', error);
      message.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" />;

  return (
    <div className="edit-user-form">
      <div className="edit-user-form__avatar">
        <img src={imageUrl || '/default-avatar.png'} alt="User avatar" />
        <Form.Item name="avatar">
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Change Avatar</Button>
          </Upload>
        </Form.Item>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true },
            { type: 'email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditUserForm;