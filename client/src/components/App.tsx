import React, { useState, useEffect } from 'react';
import { DatePicker, message } from 'antd';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import ScheduleModal from './ScheduleModal';
import ScheduleCard from './ScheduleCard';
import { getNextBusinessDay } from '../utils/dateUtils';
import api from '../api';
import logo from '../assets/images/logo.png';
import useSchedules from '../hooks/useSchedules';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const Logo = styled.img`
  width: 300px;
  margin-top: -180px;
`;

const App: React.FC = () => {
  const today = dayjs();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(getNextBusinessDay(today));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { schedules, getSchedulesByDay } = useSchedules(selectedDate);

  useEffect(() => {
    getSchedulesByDay();
  }, [selectedDate, getSchedulesByDay]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const disabledDate = (current: Dayjs) => {
    return current && (current < dayjs().startOf('day') || current.day() === 6 || current.day() === 0);
  };

  const showModal = (time: string) => {
    setSelectedTime(time);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (formValues: any) => {
    if (!selectedTime) return;

    const startDateTime = selectedDate.hour(parseInt(selectedTime.split(':')[0])).minute(parseInt(selectedTime.split(':')[1]));
    const duration = formValues.washType === 'SIMPLE' ? 30 : 45;
    const endDateTime = startDateTime.add(duration, 'minute');

    try {
      console.log(32432432, api);
      await api.post('/schedules', {
        type: formValues.washType,
        licensePlate: formValues.plate,
        startTime: startDateTime.toDate(),
        endTime: endDateTime.toDate(),
      });
      setIsModalVisible(false);
      messageApi.success('Agendamento realizado com sucesso!');
      getSchedulesByDay();
    } catch (error) {
      console.error('Erro ao agendar:', error); 
    }
  };

  const cancelSchedule = async (id: string) => {
    try {
      await api.delete(`/schedules/${id}`);
      messageApi.success('Agendamento cancelado com sucesso!');
      getSchedulesByDay();
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      messageApi.error('Erro ao cancelar agendamento.');
    }
  };

  return (
    <Container>
      {contextHolder}
      <Logo src={logo} alt="Logo" />
      <ScheduleCard
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        disabledDate={disabledDate}
        schedules={schedules}
        showModal={showModal}
        cancelSchedule={cancelSchedule}
      />
      <ScheduleModal 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        selectedTime={selectedTime} 
      />
    </Container>
  );
};

export default App;
