import React, { useEffect, useState } from 'react'
import TeamCard from './subSections/TeamCard'
import { useStateManager } from 'react-select'
import { getMyTeams } from '../../utils/team.data.fetch';

const MyTeams = () => {
    const [list, setlist] = useState([]);
    async function getMyTeam(){
        const data = await getMyTeams();
        console.log(data)
        setlist(data.data)
    }

    useEffect(() => {
        getMyTeam();
    }, [])
    
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