import Buttons from "../../subcomponents/Buttons";
import defaultavatar from "../../../assets/defaultavatar.png"
const Followers = ({ user }) => {

    if (!user)
        return

    return (
        <div className="p-1">
            <div className='flex items-center justify-between gap-2 '>
                <div className="flex items-center gap-3">
                <img src={defaultavatar} alt="avatar" className='w-10 h-10 rounded-full border-2' />
                <p>{user?.fullName}</p>
                </div>
            <Buttons text={"Follow"} />
            </div>
           
        </div>
    );
}

export default Followers;
