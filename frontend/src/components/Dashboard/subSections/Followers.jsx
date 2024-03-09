import Buttons from "../../subcomponents/Buttons";

const Followers = ({ user }) => {

    if (!user)
        return

    return (
        <div className="p-4">
            <div className='flex items-center gap-2 mb-3'>
                <img src="" alt="avatar" className='w-10 h-10 rounded-full border-2' />
                <p>{user.fullName}</p>
            <Buttons text={"Follow"} />
            </div>
           
        </div>
    );
}

export default Followers;
