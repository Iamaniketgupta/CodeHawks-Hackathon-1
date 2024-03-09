
const InputComp = ({id,label,placeholder,type},props) => {
    return (
        <div className="w-[100%] h-fit mb-2 p-1 mx-auto">
           {label && <label htmlFor={id} className="block pl-2 mb-1 font-semibold">{label}</label>}
            <input id={id} type={type} className="px-3 py-2 w-full outline-offset-2 outline-blue-700 bg-white border-2 rounded-3xl text-sm" {...props}  placeholder={placeholder}/>
        </div>
    );
}

export default InputComp;
