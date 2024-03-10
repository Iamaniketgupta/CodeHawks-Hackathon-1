
const InputComp = (props) => {
    return (
        <div className="w-[100%] h-fit mb-2 p-1 mx-auto">
           {props.label && <label htmlFor={props.id} className="block pl-2 mb-1 font-semibold">{props.label}</label>}
            <input {...props}
             className="px-3 py-2 w-full outline-offset-2 outline-blue-700 text-slate-900 bg-white border-2 rounded-3xl text-sm"  />
        </div>
    );
}

export default InputComp;
