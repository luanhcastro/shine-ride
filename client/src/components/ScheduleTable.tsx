import React, { useState } from 'react';
import { Table, Button, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ConfirmCancelModal from './ConfirmCancelModal';
import api from '../api';

interface ScheduleTableProps {
  schedules: any[];
  cancelSchedule: (id: string) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedules, cancelSchedule }) => {
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');

  const showCancelModal = (id: string) => {
    setSelectedScheduleId(id);
    setCancelModalVisible(true);
  };

  const handleCancel = () => {
    setCancelModalVisible(false);
  };

  const handleConfirmCancel = async () => {
    try {
      await api.delete(`/schedules/${selectedScheduleId}`);
      message.success('Agendamento cancelado com sucesso!');
      cancelSchedule(selectedScheduleId);
      setCancelModalVisible(false);
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      message.error('Erro ao cancelar agendamento.');
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Placa',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
    },
    {
      title: 'Tipo de Lavagem',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (text === 'COMPLETE' ? 'Completa' : 'Simples'),
    },
    {
      title: 'Data e Hora',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => new Date(text).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, record: any) => (
        <Button type="primary" danger onClick={() => showCancelModal(record.id)}>
          Cancelar
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={schedules} rowKey="id" />
      <ConfirmCancelModal
        visible={cancelModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
};

export default ScheduleTable;
