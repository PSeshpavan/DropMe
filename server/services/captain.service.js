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
    carName // New parameter for Car Name
}) => {

    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType || !carName) {
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
            vehicleType,
            carName // Include Car Name in the vehicle object
        }
    });

    await captain.save();
    return captain;
}

export default createCaptain;