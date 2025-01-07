import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import VoiceService from '../../../services/VoiceService';
import './CreateVoiceForm.scss';

const CreateVoiceForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [voiceNames, setVoiceNames] = useState([]);
  const [loadingVoiceNames, setLoadingVoiceNames] = useState(false);
  const [ages, setAges] = useState([]);
  const [deviceProfiles, setDeviceProfiles] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [types, setTypes] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agesData, profilesData, langsData, typesData] = await Promise.all([
          VoiceService.getAllAges(),
          VoiceService.getAllDeviceProfiles(),
          VoiceService.getAllLanguages(),
          VoiceService.getAllTypes()
        ]);
        setAges(agesData);
        setDeviceProfiles(profilesData);
        setLanguages(langsData);
        setTypes(typesData);
      } catch (error) {
        message.error('Failed to fetch form data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchVoiceNames = async () => {
      const values = form.getFieldsValue(['type_id', 'language_id', 'gender']);
      if (values.type_id && values.language_id && values.gender) {
        try {
          setLoadingVoiceNames(true);
          const names = await VoiceService.getGgcVoiceName(
            values.type_id,
            values.language_id,
            values.gender
          );
          setVoiceNames(names);
        } catch (error) {
          message.error('Failed to fetch voice names');
        } finally {
          setLoadingVoiceNames(false);
        }
      }
    };
    fetchVoiceNames();
  }, [form.getFieldValue('type_id'), form.getFieldValue('language_id'), form.getFieldValue('gender')]);

  const handleDependencyChange = async () => {
    const values = form.getFieldsValue(['type_id', 'language_id', 'gender']);
    setFormValues(values);
    
    // Reset name when dependencies change
    form.setFieldValue('name', undefined);

    // Fetch voice names if all dependencies are selected
    if (values.type_id && values.language_id && values.gender) {
      try {
        setLoadingVoiceNames(true);
        const names = await VoiceService.getGgcVoiceName(
          values.type_id,
          values.language_id,
          values.gender
        );
        setVoiceNames(names);
      } catch (error) {
        message.error('Failed to fetch voice names');
        setVoiceNames([]);
      } finally {
        setLoadingVoiceNames(false);
      }
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await VoiceService.createVoice(values);
      message.success('Voice created successfully');
      form.resetFields();
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to create voice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-voice-form">
      <h2>Create New Voice</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="language_id"
          label="Language"
          rules={[{ required: true, message: 'Please select language' }]}
        >
          <Select onChange={() => handleDependencyChange()}>
            {languages.map(lang => (
              <Select.Option key={lang.id} value={lang.id}>
                {lang.language}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="type_id"
          label="Type"
          rules={[{ required: true, message: 'Please select type' }]}
        >
          <Select onChange={() => handleDependencyChange()}>
            {types.map(type => (
              <Select.Option key={type.id} value={type.id}>
                {type.type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender' }]}
        >
          <Select onChange={() => handleDependencyChange()}>
            <Select.Option value="MALE">Male</Select.Option>
            <Select.Option value="FEMALE">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Voice Name"
          rules={[{ required: true, message: 'Please select voice name' }]}
        >
          <Select
            loading={loadingVoiceNames}
            disabled={!form.getFieldValue('gender') || !form.getFieldValue('language_id') || !form.getFieldValue('type_id')}
            placeholder={loadingVoiceNames ? 'Loading voice names...' : 'Select a voice name'}
          >
            {voiceNames.map(name => (
              <Select.Option key={name} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="casual_name"
          label="Casual Name"
          rules={[{ required: true, message: 'Please input casual name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age_id"
          label="Age"
          rules={[{ required: true, message: 'Please select age' }]}
        >
          <Select>
            {ages.map(age => (
              <Select.Option key={age.id} value={age.id}>
                {age.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="device_profile_id"
          label="Device Profile"
          rules={[{ required: true, message: 'Please select device profile' }]}
        >
          <Select>
            {deviceProfiles.map(profile => (
              <Select.Option key={profile.id} value={profile.id}>
                {profile.casual_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>



        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create Voice
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateVoiceForm;