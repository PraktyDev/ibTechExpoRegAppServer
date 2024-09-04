import { Router } from 'express';
import { createAttendee, deleteAttendee, getAttendee, getAttendees, updateAttendee } from '../controllers/attendeeController.js';

const router = Router();

//CREATE OPERATION
router.post('/attendee', createAttendee)
//READ OPERATION
router.get('/attendees', getAttendees)
router.get('/attendee/:id', getAttendee)
//UPDATE OPERATION
router.put('/attendee/:id', updateAttendee)
//DELETE OPERATION
router.delete('/attendee/:id', deleteAttendee)


export default router;