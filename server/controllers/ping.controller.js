import { Router } from 'express';
const router = Router();


router.get('/', (req, res) => {
    logger.info("here")
    res.send({
        ping: "OK",
        date: new Date().toISOString()
    })
})

export default router;