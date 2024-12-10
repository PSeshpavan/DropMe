import User from '../models/user.model.js';

const createUser = async ({
    firstname,
    lastname,
    email,
    password
}) => {
    if(!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }


    const newUser = new User({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    await newUser.save();
    
    return newUser;
}

export default  createUser ;