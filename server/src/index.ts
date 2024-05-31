import Express from 'express';
import cors from 'cors';
import { createScheduleHandler, getAllSchedulesHandler, deleteScheduleHandler, getAllSchedulesByDayHandler } from './controller';

const app = Express();
app.use(Express.json());
app.use(cors());

const PORT = process.env.PORT;
const path = '/api/schedules';

app.post(path, createScheduleHandler);
app.get(path, getAllSchedulesHandler);
app.get(path + '/:day', getAllSchedulesByDayHandler);
app.delete(path + '/:id', deleteScheduleHandler);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
