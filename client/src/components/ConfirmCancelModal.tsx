import React from 'react';
import { Modal, Button } from 'antd';

interface ConfirmCancelModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmCancelModal: React.FC<ConfirmCancelModalProps> = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      title="Cancelar Agendamento"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Voltar
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Confirmar
        </Button>,
      ]}
    >
      Tem certeza de que deseja cancelar este agendamento?
    </Modal>
  );
};

export default ConfirmCancelModal;
