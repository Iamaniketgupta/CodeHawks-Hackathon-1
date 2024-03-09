import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import defaultavatar from "../../assets/defaultavatar.png"
import AllEvents from "./subSections/AllEvents";


const HomeSection = () => {
    return (
        <div>
           
           {/* profile section */}
            <div>
                <div>
                Aniket Gupta
                <img src={defaultavatar} alt="profile" />
                </div>

            </div>

            {/* search and filters */}
            <div className='searchUsers '>
                <input type="searchBox" id="" /><CiSearch />
            </div>

            <div className="filterusers">
                <FaFilter />
                <div>

                    <label htmlFor="region">
                        Filter By Region
                    </label>
                    <input type="text" id="region" />


                </div>
                <div>
                    <label htmlFor="bysports">
                        Filter By Sports
                    </label>
                    <input type="text" id="sports" />

                </div>

            </div>

{/* Tabs */}
        <section>
            {/* tabs */}

           
            <div>
                <div>
                    All Events
                </div>
                <div>
                <div>
                    Near By users
                </div>
                    Followers
                </div>
                <div>
                    Following
                </div>
            </div>

{/* Components */}
 
 {/* All Events */}
 <AllEvents />
 {/* All users Or Near By*/}

 {/* Following */}

 {/* Followers */}


        </section>





        </div>
    );
}

export default HomeSection;
