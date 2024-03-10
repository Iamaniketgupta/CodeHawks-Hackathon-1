import axios from 'axios'
import { request} from '../constants'

const createTeam = async (formData)=>{
    try {
        const response = await axios.post(`${request}/teams/createTeam` , formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching createTeam:', error);
    }
}

const findTeam = async (searchQuery)=>{
    try {
        const response = await axios.post(`${request}/teams/findTeam?searchQuery=${searchQuery}`  , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching findTeam:', error);
    }
}

const addMembers = async (teamId , data)=>{
    try {
        const response = await axios.post(`${request}/teams/addMembers/${teamId}` , data  , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching findTeam:', error);
    }
}


const removeMember = async (teamId , memberId)=>{
    try {
        const response = await axios.post(`${request}/teams/removeMember/${teamId}/${memberId}` , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching findTeam:', error);
    }
}


const addOneMember = async (teamId , memberId)=>{
    try {
        const response = await axios.post(`${request}/teams/addOneMember/${teamId}/${memberId}` , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching findTeam:', error);
    }
}


export {
    createTeam,
    findTeam,
    addMembers,
    removeMember,
    addOneMember
}