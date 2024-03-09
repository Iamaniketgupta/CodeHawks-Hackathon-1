import InputComp from "./subcomponents/InputComp";
import Buttons from "./subcomponents/Buttons";
import { useState } from "react";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        phone: "",
        password: ""
    });

    const loginHandler = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData); 
            } else {
                console.error('Failed to log in:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    const handleSetData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className="flex justify-center items-center h-screen overflow-hidden text-xs">
            <div className="flex flex-col justify-center w-[290px] h-fit py-8 px-5 text-white dark:text-slate-800 dark:bg-white bg-slate-800 text-inherit rounded-2xl">
                <h2 className="font-bold text-2xl text-center my-3">Log In</h2>
                <form onSubmit={loginHandler}>
                    <InputComp
                        value={data.email}
                        name="email"
                        onChange={(e)=>handleSetData(e)}
                        type="email"
                        label="Enter Email"
                        id="email"
                        required
                        placeholder="Enter Email"
                    />
                    <p className="text-center font-semibold">OR</p>
                    <InputComp
                        value={data.phone}
                        onChange={(e)=>handleSetData(e)}
                        type="tel"
                        label="Phone"
                        id="phone"
                        name="phone"
                        placeholder="Enter Phone"
                    />
                    <InputComp
                        value={data.password}
                        onChange={(e)=>handleSetData(e)}
                        type="password"
                        label="Password"
                        id="password"
                        name="password"
                        required
                        placeholder="Enter Password"
                    />
                    <Buttons text="Log In" />
                </form>
                <p className="text-center mt-4">Forget Password? Click here</p>
            </div>
        </div>
    );
}

export default Login;
