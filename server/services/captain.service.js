import Captain from "../models/captain.model.js";

const createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) => {

    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = new Captain({
        fullname: {
            firstname: firstname,
            lastname: lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    await captain.save();
    return captain;
}

export default  createCaptain ;