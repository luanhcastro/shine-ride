import { useState, useCallback } from 'react';
import api from '../api';
import { Dayjs } from 'dayjs';

const useSchedules = (selectedDate: Dayjs) => {
  const [schedules, setSchedules] = useState<any[]>([]);

  const getSchedulesByDay = useCallback(async () => {
    try {
      const { data } = await api.get('/schedules/' + selectedDate.toDate());
      setSchedules(data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  }, [selectedDate]);

  return { schedules, getSchedulesByDay };
};

export default useSchedules;
