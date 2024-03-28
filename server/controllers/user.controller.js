import { Router } from 'express';
import { body, checkSchema } from 'express-validator';
import { createUser, editUser, getAll, deleteUser, updateImagePath, login } from '../services/user.service.js';
import upload from '../utils/fileupload.js';
const router = Router();

router.get('/getAll',
    async (req,res) => {
        try{
            const allUsers = await getAll();
            if(allUsers.length == 0){
                res.status(200).send({
                    message: "No Users in database"
                });
                return;
            }
            res.status(200).send({
                ...allUsers
            });
        } catch(error){
            res.status(500).send(
                {
                    error: error.message
                }
            );
        }
})

router.post('/login', async (req,res) => {

    const {email, password} = req.body;

    if(email && password){
        const isValid = await login(email, password);
        if(isValid){
            res.status(200).send({
                message: "login success"
            })
        } else {
            res.status(401).send({
                message: "Invalid credentials"
            })
        }
    } else {
        res.status(400).send({
            message: "Bad request"
        })
    }
    
})

router.post('/create',  async (req,res) => {
        try{
            const result = await checkSchema({
                email: { 
                    isEmail: true,
                    errorMessage: "Please Enter valid email",
                    optional: false,
                },
                password: { 
                    errorMessage: "Password must be Strong",
                    isStrongPassword: true,
                    optional: false,
                },
                fullname: {
                    isString: true,
                    isLength: { options: {min: 3, max: 30} },
                    optional: false,
                    errorMessage: "Full name must be longer than 3 and less than 30 characters and should not be alphanumeric",
                    isAlphanumeric: false
                }
              }).run(req);
        
            const isReqValid = result.every(r=> r.errors.length == 0);
            if(!isReqValid){
                logger.warn("Invlaild Request");
                res.status(401).send(
                    { 
                        "errors" : result.map(r => r.errors.map( e => ({path: e.path, message: e.msg}))).filter(e => e.length != 0)
                    }
                );
                return;
            }
            const reqBody = req.body;
            const { _id } = await createUser(reqBody);
            res.status(201).send({
                message: "User created successfully",
                id: _id
            })
        } catch(error) {
            res.status(500).send(
                {
                    error: error.message
                }
            );
        }
    }
)

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        if(!user.fullname && !user.password){
            logger.warn("Invlaild Request");
            res.status(401).json(
                { 
                    "error" : 'Please provide fullname and password' 
                }
            );
        }
        const { _id } = await editUser(id, );
        res.status(200).send({
            message: `User updated successfully`,
            id: _id
        })
    } catch(error){
        res.status(500).send(
            {
                error: error.message
            }
        );
    }
})

router.delete('/delete', async (req,res) => {
    try{
        const {email} = req.body;
        const { _id } = await deleteUser(email);
        res.status(200).send({
            message: `User deleted successfull`,
            id: _id
        })
    } catch(error){
        res.status(500).send(
            {
                error: error.message
            }
        );
    }
})

router.post('/uploadImage/:id', upload.single('avatar'), async (req,res) => {
    try{    
        const id = req.params.id;
        await updateImagePath(id, req.file.path);
        res.status(200).send({
            messsage: "Image upload successful",
            path: req.file.path
        });
    } catch(error){
        res.status(500).send(
            {
                error: error.message
            }
        );
    }
})

export default router;