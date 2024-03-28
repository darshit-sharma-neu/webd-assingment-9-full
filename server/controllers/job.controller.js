import { Router } from 'express';
import { getAllJobs } from '../services/job.service.js';
const router = Router();

router.get('/getAll',async (req,res) => {
    try{
        res.send(await getAllJobs());
    } catch(error){
        res.status(500).send(
            {
                error: error.message
            }
        );
    }
});

export default router;