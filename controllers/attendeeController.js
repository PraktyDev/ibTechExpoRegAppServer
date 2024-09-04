import Attendee from "../models/Attendee.js"

export const createAttendee = async (req, res) => {
    try {
        const body = req.body
        const newAttendee = new Attendee(body)
        await newAttendee.save()
        return res.status(201).json({ msg: "Attendee created", newAttendee })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const getAttendees = async (req, res) => {
    try {
        const attendee = await Attendee.find()
        if(attendee.length === 0){
            return res.status(404).json({ msg: 'No attendee in the database' })
        }
        return res.status(200).json(attendee)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const getAttendee = async (req, res) => {
    try {
        const { id } = req.params
        const attendee = await Attendee.findById(id)
        if(!attendee){
            return res.status(404).json({ msg: 'Attendee not found' })
        }
        return res.status(200).json(attendee)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const updateAttendee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phonenumber, course } = req.body
    
        const updatedAttendee = await Attendee.findByIdAndUpdate(id, { firstName, lastName, email, phonenumber, course }, { new: true });
    
        if (!updatedAttendee) {
          return res.status(404).json({ msg: 'Attendee not found' });
        }
        res.status(200).json({ msg: "Attendee is updated", updatedAttendee });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
}

export const deleteAttendee = async (req, res) => {
    try{
        const { id } = req.params
        const deletedAttendee = await Attendee.findByIdAndDelete(id)
        if(!deletedAttendee){
            return res.status(400).json({ msg: "Attendee not found in database" })
        }
        return res.status(200).json({ msg: "Attendee is deleted" })
    }
    catch(error){
        res.status(500).json({ msg: error.message })
    }
}