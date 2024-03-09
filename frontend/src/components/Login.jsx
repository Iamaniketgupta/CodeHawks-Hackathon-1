import InputComp from "./subcomponents/InputComp";
import Buttons from "./subcomponents/Buttons";
import { useState } from "react";

const Login = () => {
    const[data,setData] =useState({email:'',password:"",phone:""})
   const loginHandler =async()=>{

    }
    return (
        <div className="flex justify-center items-center h-screen overflow-hidden text-xs">
            <div className="flex flex-col justify-center w-[290px] h-fit py-8 px-5 text-white dark:text-slate-800 dark:bg-white bg-slate-800 text-inherit rounded-2xl">
            <h2 className="font-bold text-2xl text-center my-3" >Log In</h2>
                <div>
                <InputComp value={data.email}
                 type="email" label={"Enter Email"} id={"email"}  required placeholder="Enter Email"/>
                <p className="text-center font-semibold">OR</p>
                <InputComp type="tel" label={"Phone"} id={"phone"}   placeholder="Enter Phone"/>
                <InputComp type="password" label={"Password"} id={"pass"} required placeholder="Enter Password}" />
                </div>

                <Buttons text={"Log In"}/>
                <p className="text-center mt-4">Forget Password? Click here</p>
            </div>
        </div>
    );
}

export default Login;
