import React, { useEffect, useState } from 'react'
import TeamCard from './subSections/TeamCard'
import { useStateManager } from 'react-select'
import { getMyTeams } from '../../utils/team.data.fetch';
import { useSelector } from 'react-redux';

const MyTeams = () => {
    const [list, setlist] = useState([]);
    const user = useSelector((state)=>state.auth.user)
    async function getMyTeam(){
        const data = await getMyTeams();
        console.log(data)
        setlist(data.data)
    }

    useEffect(() => {
        getMyTeam();
    }, [user])
    
  return (
    <div className='w-full'>
        {
            list.map((team)=>(
                <TeamCard key={team._id} myTeam={true} team={team}/>
            ))
        }
        {/* <TeamCard/> */}
    </div>
  )
}

export default MyTeams