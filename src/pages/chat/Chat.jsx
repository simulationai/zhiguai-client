import house from './assets/house_new.png'
import ghost from './assets/ghost.png'
import person from './assets/person.jpg'
import voice from './assets/voice.png'
import bg from './assets/bg.png'
import VoiceLoading from '../../components/voiceLoading/VoiceLoading'
import { useEffect, useRef, useState } from 'react'
import Modal from '../../components/modal/Modal'
import globalStore from '../../states/global'
import invalidVoice from './assets/voice-invalid.png'

const VoiceArea = ({ setAudioBlob }) => {
    const chunks = useRef([]); // 存储录音片段的数组
    const [valid, setValid] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorder = useRef(null);


    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            setValid(true);
        } else {
            console.error('录音功能不可用');
        }
    }, [])

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.addEventListener("dataavailable", event => {
                chunks.current.push(event.data);
            });
            mediaRecorder.current.start(); // 开始录音
            console.log('录音开始');
        } catch (error) {
            console.error('无法获取录音权限:', error);
        }
    }

    function stopRecording() {
        if (mediaRecorder.current && (mediaRecorder.current.state === 'recording' || mediaRecorder.current.state === 'paused')) {
            mediaRecorder.current.stop();
            console.log('录音停止');
        }
        // 处理录音数据，例如转换成Blob并下载
        mediaRecorder.current.onstop = handleStop;
    }

    function handleStop() {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        chunks.current = [];
        console.log(blob);
        setAudioBlob(blob);
        return;
        const formData = new FormData();
        formData.append('audioFile', blob, 'recorded_audio.webm'); // 第三个参数是文件名，可根据需要修改

        // 发起POST请求上传音频
        fetch('YOUR_SERVER_ENDPOINT', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // 假设服务器返回JSON格式的数据
            })
            .then(data => {
                console.log('录音上传成功:', data);
                // 这里可以处理服务器返回的数据，比如显示成功信息或错误信息
            })
            .catch(error => {
                console.error('录音上传失败:', error);
            });
        // const blob = new Blob(chunks, { type: 'audio/webm' }); // 假设音频类型为webm
        // chunks = []; // 清空数组，准备下一次录音
    }
    return (
        <div className='w-32 h-32 rounded-full bg-black p-5 cursor-pointer'>
            {valid && isRecording ?
                <VoiceLoading onClick={() => { setIsRecording(false); stopRecording(); }} />
                :
                <img src={voice} onClick={() => { setIsRecording(true); startRecording(); }} />
            }
            {!valid && <img src={invalidVoice} />}
        </div>
    )
}


const TextArea = ({ text }) => {
    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} className='flex-1 rounded-lg border-black relative'>
            <img src={person} className='absolute w-36 h-36 -top-2/3 left-5' />
            <div className='text-white m-5 h-44 overflow-y-auto '>{text}</div>
        </div>
    )
}


const InputArea = ({ input, onChangeInput }) => {
    return (
        <div className='h-full flex'>
            <textarea style={{ resize: "none" }} value={input} onChange={e => onChangeInput(e.target.value)} className='h-full w-96 rounded-l-lg break-all p-2 bg-slate-300 text-2xl outline-none' placeholder='输入对话内容' />
            <button className='h-full w-20 bg-slate-300 border-l rounded-r-lg hover:bg-slate-400'>发送</button>
        </div>
    )
}

const OptionModal = ({ onClose, visible }) => {
    const { setCurPage } = globalStore();
    const handleToIndex = () => {
        setCurPage("index")
    }

    const handleWithdraw = () => {
        setCurPage("selectTarget")
    }
    return (
        <>
            {visible && <Modal onClose={onClose}>
                <div className='w-full h-full flex flex-col'>
                    <div className='text-8xl text-white mt-10 text-center'>你想做什么?</div>
                    <div className='mt-auto flex gap-10 justify-center'>
                        <button onClick={handleWithdraw} className="text-6xl text-white border-white p-2  hover:text-red-500">逃跑</button>
                        <button onClick={handleToIndex} className="text-6xl text-white border-white p-2  hover:text-red-500">回到主页</button>
                    </div>
                </div>
            </Modal>}
        </>

    )
}

const Chat = () => {
    const [input, setInput] = useState("");
    const [text, setText] = useState("");
    const [showOptionModal, setShowOptionModal] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    useEffect(() => {
        const increaseText = async () => {
            const total = "需要什么帮助吗需要什么帮助吗需要什么帮助吗需要";
            let curIdx = 0;
            // 如果当前文本还没有达到目标文本长度，就继续增加
            const incr = () => {
                setTimeout(() => {
                    if (curIdx < total.length - 1) {
                        setText(prev => prev + total[curIdx]);
                        curIdx += 1;
                        incr();
                    }
                }, 100)
            }
            incr();
        };
        increaseText();
    }, [])

    useEffect(() => {
        if (audioBlob) {
            const url = URL.createObjectURL(audioBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recorded_audio.webm';
            document.body.appendChild(a);
            a.click();
        }
    }, [audioBlob])

    return (
        <div className='w-full h-full relative'>
            <img src={bg} className='absolute w-full h-full bg-cover' />
            {!showOptionModal &&
                <>
                    <img src={house} style={{ scale: "2" }} className='z-10 absolute left-[600px] top-[200px]' />
                    <img src={ghost} style={{ scale: "1.5" }} className='z-10 absolute left-[610px] top-[400px]' />
                    <img src={person} className='z-0 w-44 h-44 absolute left-[650px] top-[350px]' />
                    <div className='absolute flex gap-2 items-center bottom-12 w-[1800px] h-44 text-4xl left-1/2 transform -translate-x-1/2'>
                        <VoiceArea setAudioBlob={setAudioBlob} />
                        <TextArea text={text} />
                        <InputArea input={input} onChangeInput={setInput} />
                    </div>
                </>
            }
            <button onClick={setShowOptionModal.bind(null, true)} className="absolute text-4xl text-white border-white p-2  hover:text-red-500">选项</button>
            <OptionModal visible={showOptionModal} onClose={setShowOptionModal.bind(null, false)} />
        </div>
    )
}

export default Chat;