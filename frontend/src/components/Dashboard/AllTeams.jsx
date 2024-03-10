import React, { useEffect, useState } from 'react'
import TeamCard from './subSections/TeamCard'
import { getAllTeams } from '../../utils/team.data.fetch';
import { useSelector } from 'react-redux';

const AllTeams = () => {
    const user = useSelector((state)=>state.auth.user);
    const [list, setlist] = useState([]);
    async function getAllTeam(){
        const data = await getAllTeams();
        console.log(data)
        setlist(data.data)
    }

    console.log(user)
    

    useEffect(() => {
        getAllTeam();
    }, [])
  return (
    <div className='w-full'>
        {
            list.map((team)=>(
                <TeamCard team={team} myTeam={team.members.includes(user.user._id) || team.createdBy._id == (user.user._id)} />
            ))
        }
    </div>
  )
}

export default AllTeams