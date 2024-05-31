import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

interface ScheduleModalProps {
  visible: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  selectedTime: string | null;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ visible, onOk, onCancel, selectedTime }) => {
  const [form] = Form.useForm();

  const validatePlate = (rule: any, value: string, callback: (error?: string) => void) => {
    const regex = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/;
    if (!value.match(regex) && value !== '') {
      callback('Por favor, insira uma placa válida!');
    } else {
      callback();
    }
  };

  const normalizePlate = (value: string) => {
    return value.toUpperCase().slice(0, 7);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onOk(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      width={270}
      title={`Agendar para ${selectedTime}`}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Agendar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="schedule_form">
        <Form.Item
          name="plate"
          label="Placa do Veículo"
          rules={[
            { required: true, message: 'Por favor, insira a placa do veículo!' },
            { validator: validatePlate }
          ]}
          normalize={normalizePlate}
        >
          <Input maxLength={7} style={{ width: '100%' }}/>
        </Form.Item>
        <Form.Item
          name="washType"
          label="Tipo de Lavagem"
          rules={[{ required: true, message: 'Por favor, selecione o tipo de lavagem!' }]}
        >
          <Select style={{ width: '100%' }}>
            <Option value="SIMPLE">Simples (30 minutos)</Option>
            <Option value="COMPLETE">Completa (45 minutos)</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ScheduleModal;
