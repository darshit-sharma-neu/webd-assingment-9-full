import User from "../models/user.model.js";
import encode, {compare} from "../utils/passwordEncoder.js";

export async function createUser(user){
    try{
        const { 
            email,
            fullname,
            password
        } = user;
        const newUser = new User({
            email: email,
            fullname: fullname,
            password: await encode(password)
        });
        return newUser.save();
    } catch(error){
        logger.error(`Error Creating user with data - ${user}`);
        logger.error(`${error.message}`);
        throw new Error(`User creation failed`);
    }   
}

export async function getAll(){
    try{
        return User.find();
    } catch (error){
        logger.error(`Error fetching all user`);
        throw new Error(`Failed to get all users`);
    }
}

export async function editUser(id,user){
    try{
        const prevUser = await User.findById(id);
        if(!prevUser){
            logger.warn(`No user found with ID - ${id}`);
            throw new Error('No user found with ID - ${id}')
        }
        user['email'] = prevUser.email;
        return User.findByIdAndUpdate(id, {
            ...user
        })
    } catch(error){
        logger.error(`Error Editing user with data - ${id}`);
        logger.error(`${error.message}`);
        throw new Error(`failed to edit user with data - ${id}`);
    }
}

export async function deleteUser(email){
    try{
        const [user] = await User.find({
            email: email
        });
        if(!user){
            logger.warn(`No user found with ID - ${id}`);
            throw new Error('No user found with ID - ${id}')
        }
        return User.findByIdAndDelete(user._id);
        
    } catch(error){
        logger.error(`Error Deleting user with id - ${id}`);
        logger.error(`${error.message}`);
        throw new Error(`failed to delete user with id - ${id}`);
    }
}

export async function updateImagePath(id, imagePath){
    try{
        const user = await User.findById(id);
        if(!user){
            logger.warn(`No user found with ID - ${id}`);
            throw new Error('No user found with ID - ${id}')
        }
        return User.findByIdAndUpdate(id, {
            image: imagePath
        })
    } catch(error){
        logger.error(`Error Updating user with id - ${id}`);
        logger.error(`${error.message}`);
        throw new Error(`failed to update user with id and image - ${id}`);
    }
}

export async function login(email, password){
    const user = await User.findOne({
        email: email,
    });

    if(!user){
        logger.warn(`No user with Email -  ${email} found`)
        return false;
    }
    const isPasswordValid = await compare(user.password, password);

    return isPasswordValid;

}
