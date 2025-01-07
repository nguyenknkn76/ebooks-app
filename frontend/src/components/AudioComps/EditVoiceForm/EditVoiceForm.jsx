import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message, Spin } from 'antd';
import VoiceService from '../../../services/VoiceService';
import './EditVoiceForm.scss';

const EditVoiceForm = ({ voiceId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetchingVoice, setFetchingVoice] = useState(true);
  const [ages, setAges] = useState([]);
  const [deviceProfiles, setDeviceProfiles] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [types, setTypes] = useState([]);
  const [voiceNames, setVoiceNames] = useState([]);
  const [loadingVoiceNames, setLoadingVoiceNames] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [voice, agesData, profilesData, langsData, typesData] = await Promise.all([
          VoiceService.getVoiceById(voiceId),
          VoiceService.getAllAges(),
          VoiceService.getAllDeviceProfiles(),
          VoiceService.getAllLanguages(),
          VoiceService.getAllTypes()
        ]);

        setAges(agesData);
        setDeviceProfiles(profilesData);
        setLanguages(langsData);
        setTypes(typesData);

        form.setFieldsValue({
          name: voice.name,
          casual_name: voice.casual_name,
          gender: voice.gender,
          age_id: voice.age.id,
          device_profile_id: voice.device_profile.id,
          language_id: voice.language.id,
          type_id: voice.type.id
        });
      } catch (error) {
        message.error('Failed to fetch voice data');
      } finally {
        setFetchingVoice(false);
      }
    };
    fetchData();
  }, [voiceId, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await VoiceService.updateVoice(voiceId, values);
      message.success('Voice updated successfully');
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to update voice');
    } finally {
      setLoading(false);
    }
  };
  
  if (fetchingVoice) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  const handleDependencyChange = async () => {
    const values = form.getFieldsValue(['type_id', 'language_id', 'gender']);
    form.setFieldValue('name', undefined);

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

  return (
    <div className="edit-voice-form">
      <h2>Edit Voice</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="language_id"
          label="Language"
          rules={[{ required: true }]}
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
          rules={[{ required: true }]}
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
          rules={[{ required: true }]}
        >
          <Select onChange={() => handleDependencyChange()}>
            <Select.Option value="MALE">Male</Select.Option>
            <Select.Option value="FEMALE">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Voice Name"
          rules={[{ required: true }]}
        >
          <Select
            loading={loadingVoiceNames}
            disabled={!form.getFieldValue('gender') || !form.getFieldValue('language_id') || !form.getFieldValue('type_id')}
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
            Update Voice
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditVoiceForm;