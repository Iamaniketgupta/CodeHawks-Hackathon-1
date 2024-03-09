import axios from 'axios'
import { request} from '../constants'

const createLocalEvent = async (formData)=>{
    try {
        const response = await axios.post(`${request}/events/createLocalEvent` , formData ,{
          withCredentials:true
        });  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching createTeam:', error);
    }
}


const deleteEvent = async (eventId)=>{
  try {
      const response = await axios.post(`${request}/events/deleteEvent/${eventId}` , {} ,{
        withCredentials:true
      });  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching createTeam:', error);
  }
}


const addParticipant = async (eventId , userId)=>{
  try {
      const response = await axios.post(`${request}/events/addParticipant/${eventId}/${userId}` , {} ,{
        withCredentials:true
      });  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching createTeam:', error);
  }
}

const removeParticipant = async (eventId , userId)=>{
  try {
      const response = await axios.post(`${request}/events/removeParticipant/${eventId}/${userId}` , {} ,{
        withCredentials:true
      });  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching createTeam:', error);
  }
}


const getEventById = async (eventId)=>{
  try {
      const response = await axios.post(`${request}/events/getEventById/${eventId}` , {} ,{
        withCredentials:true
      });  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching createTeam:', error);
  }
}





export{
  createLocalEvent,
  deleteEvent,
  addParticipant,
  removeParticipant,
  getEventById
}