import axios from 'axios'
import { request} from '../constants'

const createLocalEvent = async (formData)=>{
    try {
        const response = await axios.post(`${request}/events/createLocalEvent` , formData , {
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



export{

}