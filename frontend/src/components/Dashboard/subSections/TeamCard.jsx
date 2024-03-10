import React from 'react'

const TeamCard = ({
    team , 
    myTeam = false
}) => {
  return (
    <div className="bg-gray-900 shadow-md border border-gray-300  rounded-md p-4 m-4 w-64 overflow-hidden">
      <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
      <div className="flex items-center mb-2">
        <span className="text-white font-semibold">Category:</span>
        <span className="ml-2 text-blue-300 font-semibold">{team.category}</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-white font-semibold">Created By:</span>
        <span className="ml-2   text-blue-300 font-semibold">{team.createdBy.fullName}</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-white font-semibold">Number of Members:</span>
        <ul className="ml-2">
          {team.members.length}
        </ul>
      </div>
      <div className='w-full flex justify-end'> {!myTeam ? (<button className='px-3 py-1 text-black font-bold bg-white'>Join</button>) : (<button className='px-3 py-1 text-white font-bold bg-red-800'>Leave</button>) }  </div>
    </div>
  )
}

export default TeamCard