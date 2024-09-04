import Volunteer from "../models/Volunteer.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerVolunteer = async (req, res) => {
    try {
        const { name, username, password, role } = req.body
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const newVolunteer = new Volunteer({
            name,
            username,
            password: hashPassword,
            role,
        })
        await newVolunteer.save()
        return res.status(201).json({ msg: "Volunteer created", newVolunteer })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const loginVolunteer = async (req, res) => {
    try {
        const { username, password } = req.body
        const volunteer = await Volunteer.findOne({ username })
        if(!volunteer){
            return res.status(401).json({ msg: 'Username or Password incorrect' })
        }
        const passwordCompare = await bcrypt.compare(password, volunteer.password)
        if(!passwordCompare){
            return res.status(401).json({ msg: 'Incorrect Password' })
        }

        const accessToken = jwt.sign(
            { id: volunteer._id },
            process.env.ACCESS_KEY,
            { subject: 'accessApi', expiresIn: process.env.TOKEN_EXPIRATION }
        )

        return res.status(200).send(accessToken)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const authStatus = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "Invalid Token" });
        }

        const volunteer = await Volunteer.findOne({ _id: req.user.id })

        if (!volunteer) {
            return res.status(404).json({ msg: "Volunteer not found" });
        }

        return res.status(200).json({ id: volunteer._id, name: volunteer.name, role: volunteer.role });
    } catch (error) {
        return res.status(500).json({ msg: "Server Error", error: error.message });
    }
}

export const logoutVolunteer = async (req, res) => {

}

export const getVolunteers = async (req, res) => {
    try {
        const volunteer = await Volunteer.find()
        if(volunteer.length === 0){
            return res.status(404).json({ msg: 'No volunteer in the database' })
        }
        return res.status(200).json(volunteer)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const getVolunteer = async (req, res) => {
    try {
        const { id } = req.params
        const volunteer = await Volunteer.findById(id)
        if(!volunteer){
            return res.status(404).json({ msg: 'Volunteer not found' })
        }
        return res.status(200).json(volunteer)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const updateVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, password, role } = req.body
    
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, { name, username, password, role }, { new: true });
    
        if (!updatedVolunteer) {
          return res.status(404).json({ msg: 'Volunteer not found' });
        }
        res.status(200).json({ msg: "Volunteer is updated", updatedVolunteer });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
}

export const deleteVolunteer = async (req, res) => {
    try{
        const { id } = req.params
        const deletedVolunteer = await Volunteer.findByIdAndDelete(id)
        if(!deletedVolunteer){
            return res.status(400).json({ msg: "Volunteer not found in database" })
        }
        return res.status(200).json({ msg: "Volunteer is deleted" })
    }
    catch(error){
        res.status(500).json({ msg: error.message })
    }
}