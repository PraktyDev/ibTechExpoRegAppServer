import { Router } from 'express';
import { authStatus, deleteVolunteer, getVolunteer, getVolunteers, loginVolunteer, logoutVolunteer, registerVolunteer, updateVolunteer } from '../controllers/volunteerController.js';
import { verifyToken } from '../utils/authMiddleware.js';

const router = Router();

//CREATE OPERATION
router.post('/volunteer/register', registerVolunteer)
router.post('/volunteer/login', loginVolunteer)
//READ OPERATION
router.get('/volunteer/status', verifyToken, authStatus)
router.get('/volunteers', getVolunteers)
router.get('/volunteer/:id', getVolunteer)
router.get('/volunteer/logout', logoutVolunteer)
//UPDATE OPERATION
router.put('/volunteer/:id', updateVolunteer)
//DELETE OPERATION
router.delete('/volunteer/:id', deleteVolunteer)


export default router;