import { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import VoiceTable2 from "../../components/AudioComps/VoiceTable2/VoiceTable2";
import VoiceService from "../../services/VoiceService";
import "./AdminVoicePage.scss";
import CreateVoiceForm from "../../components/AudioComps/CreateVoiceForm/CreateVoiceForm";
import EditVoiceForm from "../../components/AudioComps/EditVoiceForm/EditVoiceForm";

const AdminVoicePage = () => {
  const [voices, setVoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState(null);

  const fetchVoices = async () => {
    try {
      setLoading(true);
      const data = await VoiceService.getAllVoices();
      setVoices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  const handleEdit = (voiceId) => {
    setSelectedVoiceId(voiceId);
    setEditModalVisible(true);
  };

  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
    fetchVoices();
  };

  const handleEditSuccess = () => {
    setEditModalVisible(false);
    setSelectedVoiceId(null);
    fetchVoices();
  };

  if (loading) return <div>Loading voices...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-voice-page">
      <div className="page-header">
        <h2>Voice Management</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create Voice
        </Button>
      </div>
      {
        voices && 
        <VoiceTable2 
          voices={voices}
          onEdit={handleEdit}
        />
      }
      <Modal
        title="Create Voice"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={800}
      >
        <CreateVoiceForm onSuccess={handleCreateSuccess} />
      </Modal>

      <Modal
        title="Edit Voice"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setSelectedVoiceId(null);
        }}
        footer={null}
        width={800}
      >
        {selectedVoiceId && (
          <EditVoiceForm 
            voiceId={selectedVoiceId}
            onSuccess={handleEditSuccess}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminVoicePage;