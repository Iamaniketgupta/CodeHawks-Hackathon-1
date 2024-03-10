import { FaRegHeart } from "react-icons/fa";

const AllEvents = () => {
    
    return (
        <div className='w-full text-gray-700 relative text-xs px-2 rounded-lg bg-slate-400'>
            <div className="h-fit py-2 pb-3 px-2 flex flex-col gap-1 max-h-[300px] ">
                <div className="h-fit p-2 my-2 font-bold text-lg overflow-hidden">Soccer Play Event</div>
                <div className="px-2 text-blue-500 font-semibold">2:00 P.M  <span>Date : 23-02-2023</span>-</div>
                <div className="px-2 font-semibold">Ludhiana, Punjab,jamalpur Ground</div>
                <div className="h-fit px-2">
                    Lorem ipsum dolor sit amet...
                </div>
                <div className="flex flex-wrap items-center px-2 ">Sports : <span className="bg-slate-300 rounded-md px-5 py-1 h-fit inline-block">Soccer</span>
                    , football </div>
                <div className="px-2 text-blue-500 font-semibold">Contact At: 855647-62265</div>
                <div className="absolute w-fit h-fit top-6 right-10"><FaRegHeart />
                </div>

            </div>
        </div>
    );
}

export default AllEvents;
