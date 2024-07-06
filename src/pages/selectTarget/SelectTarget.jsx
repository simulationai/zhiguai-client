import { useState, useEffect, useRef } from "react";
import globalStore from "../../states/global";
import villageMap from './villageMap.png'
import gameStore from '../../states/game'
import './SelectTarget.css'
import Modal from '../../components/modal/Modal'
import Carousel from './carousel/Carousel'

import img1 from './assets/outfit-1.png'
import img2 from './assets/outfit-2.png'
import img3 from './assets/outfit-3.png'
import img4 from './assets/outfit-4.png'

const TargetDetailModal = ({ person = {}, onConfirm = () => { }, onCancel = () => { } }) => {
    return (
        <Modal onClose={onCancel}>
            <div className="text-center text-7xl">{person.name}</div>
            <div className="break-words whitespace-pre-wrap text-6xl mt-3">村民介绍：{person.desc}</div>
            <div className="mt-auto mb-5 flex justify-center text-5xl gap-9">
                <button onClick={onConfirm} className="p-2 hover:text-red-500">确认</button>
                <button onClick={onCancel} className="p-2 hover:text-red-500">重选</button>
            </div>
        </Modal>
    )
}

const OutfitModal = ({ visible, onConfirm = () => { }, onCancel = () => { } }) => {
    const [outfits, setOutfits] = useState([]);
    useEffect(() => {
        const outfits = [
            { name: "张三", desc: "村民一个", src: img1 },
            { name: "李四", desc: "一个村民", src: img2 },
            { name: "王五", desc: "一个民村", src: img3 },
            { name: "赵六", desc: "一个村民", src: img4 },
        ]
        setOutfits(outfits);
    }, [])

    return (
        <>
            {visible && <Modal onClose={onCancel}>
                <div className="text-center text-7xl">装扮选择</div>
                <Carousel outfits={outfits} />
                <div className="mt-auto mb-5 flex justify-center text-5xl gap-9">
                    <button onClick={onConfirm} className="p-2 hover:text-red-500">确认</button>
                    <button onClick={onCancel} className="p-2 hover:text-red-500">返回</button>
                </div>
            </Modal>}
        </>

    )
}

const SelectTarget = () => {
    const { setCurPage } = globalStore();
    const { setCurTarget, setCurOutfit } = gameStore()
    const mapRef = useRef(null);
    const [points, setPoints] = useState([
        [1093, 214],
        [702, 632],
        [1492, 787],
    ]);
    const [people, setPeople] = useState([]);
    const [initMapWidth, setInitMapWidth] = useState(null);
    const [initMapHeight, setInitMapHeight] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showConfirmPerson, setShowConfirmPerson] = useState(false);
    const [showSelectOutfit, setShowSelectOutfit] = useState(false);



    useEffect(() => {
        const people = [
            { name: "张三", desc: "张三是村子里的老实人，待人真诚且和善。他沉默寡言，但言谈间透露出的智慧和深邃让人信任。他喜欢帮助别人，尤其是在农忙时节，总是乐意伸出援手。" },
            { name: "李四", desc: "李四描述" },
            { name: "王五", desc: "王五描述" }
        ]
        setPeople(people);
    }, [])
    useEffect(() => {
        if (mapRef.current) {
            const rect = mapRef.current.getBoundingClientRect();
            setInitMapWidth(rect.width);
            setInitMapHeight(rect.height);
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [mapRef.current]);

    const handleResize = () => {
        if (mapRef.current && initMapWidth && initMapHeight) {
            const rect = mapRef.current.getBoundingClientRect();
            const newPoints = points.map((point) => {
                return [
                    rect.width * point[0] / initMapWidth,
                    rect.height * point[1] / initMapHeight,
                ];
            });
            setPoints(newPoints);
        }
    };
    const handleMouseDown = (event) => {
        // 阻止事件冒泡，如果需要的话
        event.preventDefault();
        // 从事件对象中获取鼠标的坐标
        const x = event.pageX;
        const y = event.pageY;
        alert(x + "," + y);
    };

    const handleSelectTarget = (idx) => {
        setSelectedPerson({ ...people[idx], idx });
        setShowConfirmPerson(true)
    }

    const backToIndex = () => {
        setCurPage("index");
    }

    const handleConfirmSelect = (person) => {
        setCurTarget(person);
        setShowConfirmPerson(false);
        setShowSelectOutfit(true);
    }

    const handleConfirmOutfit = (outfit) => {
        setCurOutfit(outfit);
        setCurPage("chat");
    }

    return (
        <>
            <div
                // onClick={handleMouseDown}
                style={{
                    backgroundImage: `url(${villageMap})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'cover',
                }} className="w-full h-full bg-no-repeat relative" ref={mapRef}>
                {points.map((p, idx) => (<div onClick={handleSelectTarget.bind(null, idx)} style={{ left: p[0] + "px", top: p[1] + "px", display: selectedPerson ? idx === selectedPerson.idx ? "block" : "none" : 'block' }} key={idx} className={`absolute w-16 h-16  bg-red-500 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full ${selectedPerson?.idx === idx ? "opacity-50" : ""}`} />))}
                <button onClick={backToIndex} className="absolute text-4xl text-white border-white p-2  hover:text-red-500">回到主页</button>
                {selectedPerson && showConfirmPerson && <TargetDetailModal person={selectedPerson} onConfirm={handleConfirmSelect} onCancel={setSelectedPerson.bind(null, null)} />}
                <OutfitModal visible={showSelectOutfit} onConfirm={handleConfirmOutfit} onCancel={setShowSelectOutfit.bind(null, false)} />
            </div>
        </>

    )
}
export default SelectTarget;