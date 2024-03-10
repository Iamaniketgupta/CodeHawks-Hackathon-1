import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { getAllEvents } from "../../../utils/event.data.fetch";

const AllEvents = () => {
    const [list, setlist] = useState([]);

    async function getList(){
        const data = await getAllEvents();

        if(data){
            console.log(data)
            setlist(data.data)
        }
    }
    useEffect(() => {
        getList()
    }, [])
    
console.log(list)
    return (
        <div className="w-full h-full flex flex-wrap gap-4 pb-[70px] items-center justify-center">
            {list.map((event)=>(
                <div key={event._id} className='min-w-[300px] md:h-[200px] text-gray-700 relative text-xs px-2 rounded-lg text-white bg-slate-900'>
                <div className="h-fit py-2 pb-3 px-2 flex flex-col gap-1 max-h-[400px] ">
                    <div className="h-fit p-2 my-2 font-bold text-lg overflow-hidden">{event.title}</div>
                    <div className="px-2 text-blue-500 font-semibold">{event.time} <span>Date : {event.date}</span>-</div>
                    <div className="px-2 font-semibold">{event.location}</div>
                    <div className="h-fit px-2">
                        {event.description}
                    </div>
                    <div className="flex flex-wrap items-center px-2 ">Sports : <span className="bg-slate-800 rounded-md px-5 py-1 h-fit inline-block"> {event.category} </span>
                         </div>
                    <div className="px-2 text-blue-500 font-semibold">Contact At: {event.phoneNo} </div>
                    <div className="absolute w-fit h-fit top-6 right-10"><FaRegHeart />
                    </div>
    
                </div>
            </div>
            ))}
        </div>
    );
}

export default AllEvents;
