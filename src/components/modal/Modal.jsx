const CloseSVG = ({ onClick }) => {
    return (
        <svg onClick={onClick} t="1720251369245" className="icon hover:fill-red-600 w-10 h-10 fill-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6201">
            <path d="M86.016 0L2.048 70.656c149.504 111.616 288.768 239.616 411.136 367.616C225.792 627.2 78.848 813.056 1.536 887.808L161.28 1021.44c56.832-117.248 180.224-294.912 345.6-481.28C672.256 727.552 796.16 906.24 852.992 1024c0 0 155.648-165.376 169.472-139.776C962.56 816.64 816.128 620.032 619.52 418.816c112.64-115.712 239.104-230.4 374.272-331.264l-36.864-68.608c-153.088 76.288-299.008 189.44-430.08 309.76C394.752 203.264 245.248 83.968 86.016 0z" p-id="6202">
            </path>
        </svg>
    )
}
const Modal = ({ children, onClose }) => {
    return (
        <div className="w-full h-full flex justify-center items-center target-detail-dialog z-50 absolute">
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }} className="flex flex-col text-white w-[55rem] h-[39rem] rounded-3xl p-4 relative">
                {children}
                <div className="absolute right-5 top-5 text-4xl cursor-pointer">
                    <CloseSVG onClick={onClose} />
                </div>
            </div>
        </div>
    )
}

export default Modal;