import { useState, useEffect } from "react";
import globalStore from "../../states/global";
import bg from './bg.png'
import door from './door.png'
import Modal from "../../components/modal/Modal";


const Instruction = ({ visible, onClose }) => {
    return (
        <>
            {visible &&
                <Modal onClose={onClose}>
                    <div className='text-white p-5 flex flex-col h-full'>
                        <div className='mt-5 text-center text-7xl'>游戏说明</div>
                        <div className="mt-10 w-full text-5xl inline-block break-words whitespace-pre-wrap ">
                            (GPT写来凑字数的)在一个遥远的村庄里，夜幕降临后总是充满了神秘和恐惧。村民们讲述着关于消失的村民和古老诅咒的传说。在一个漆黑的夜晚，你被困在这个被遗忘的村庄中，必须揭开隐藏在阴影中的秘密，并找到逃离这里的方法。
                        </div>
                        <div className='flex gap-10 mt-auto justify-center'>
                            <button onClick={onClose} className="text-6xl text-white border-white p-2  hover:text-red-500">确定</button>
                        </div>
                    </div>
                </Modal>

            }
        </>
    )
}


const Index = () => {
    const setCurPage = globalStore(state => state.setCurPage);
    const [showInstruction, setShowInstruction] = useState(false);
    const handleEnter = () => {
        setCurPage('selectTarget')
    }
    return (
        <>
            <div style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} className="w-full h-full flex justify-center">
                <div className="text-center flex flex-col relative">
                    <div className="mt-56 relative flex justify-center items-center">
                        <img src={door} style={{ transform: "scale(4)", transformOrigin: "center" }} />
                        <div className="absolute text-red-500 text-[9rem] milonga">志怪</div>
                    </div>
                    <button onClick={handleEnter} className="text-6xl mt-48 bg-slate-600 hover:bg-red-500 text-white p-5 rounded-3xl">进入游戏</button>
                    <button onClick={() => { setShowInstruction(true) }} className="text-6xl mt-12 bg-slate-600 hover:bg-red-500 text-white p-5 rounded-3xl">游戏说明</button>
                </div>
                <Instruction visible={showInstruction} onClose={setShowInstruction.bind(null, false)} />
            </div>

        </>

    )
}
export default Index;