import React, { useState } from 'react';
import { Card, DatePicker, Button } from 'antd';
import styled from 'styled-components';
import TimeSlot from './TimeSlot';
import ScheduleTable from './ScheduleTable';
import { generateTimes } from '../utils/generateTimes';
import { Dayjs } from 'dayjs';

const StyledCard = styled(Card)`
  width: 800px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const times = generateTimes();

interface ScheduleCardProps {
  selectedDate: Dayjs;
  handleDateChange: (date: Dayjs | null) => void;
  disabledDate: (current: Dayjs) => boolean;
  schedules: any[];
  showModal: (time: string) => void;
  cancelSchedule: (id: string) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ selectedDate, handleDateChange, disabledDate, schedules, showModal, cancelSchedule }) => {
  const [viewMode, setViewMode] = useState<'times' | 'table'>('times');

  const isTimeWithinSchedule = (time: string) => {
    const dateTime = new Date(selectedDate.toDate());
    const [hours, minutes] = time.split(':');
    dateTime.setHours(parseInt(hours));
    dateTime.setMinutes(parseInt(minutes));
    dateTime.setSeconds(0, 0);
  
    return schedules.some(schedule => {
      const startTime = new Date(schedule.startTime);
      const endTime = new Date(schedule.endTime);
      startTime.setSeconds(0, 0);
      endTime.setSeconds(0, 0);
      console.log(dateTime, startTime, endTime);
      return dateTime >= startTime && dateTime <= endTime;
    });
  };

  return (
    <StyledCard 
      title={
        <CardHeader>
          <span>Horários Disponíveis</span>
          <div>
            <DatePicker 
              value={selectedDate} 
              allowClear={false}
              onChange={handleDateChange} 
              disabledDate={disabledDate} 
            />
            <Button style={{margin: 4}} color="green" onClick={() => setViewMode(viewMode === 'times' ? 'table' : 'times')}>
              {viewMode === 'times' ? 'Ver Agendamentos' : 'Ver Horários'}
            </Button>
          </div>
        </CardHeader>
      }
    >
      {viewMode === 'times' ? (
        times.map((time) => (
          <TimeSlot
            key={time}
            time={time}
            isDisabled={isTimeWithinSchedule(time)}
            onClick={() => showModal(time)}
          />
        ))
      ) : (
        <ScheduleTable schedules={schedules} cancelSchedule={cancelSchedule} />
      )}
    </StyledCard>
  );
};

export default ScheduleCard;
