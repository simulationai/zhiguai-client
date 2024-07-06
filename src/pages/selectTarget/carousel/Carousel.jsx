import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css'; // 引入样式文件


const Carousel = ({ outfits = [] }) => {
    const [index, setIndex] = useState(0);
    const [trueOutfits, setTrueOutfits] = useState([]);
    useEffect(() => {
        if (trueOutfits.length === 0) {
            outfits.forEach((o) => {
                setTrueOutfits(prev => [...prev, o]);
            })
            // 重复加一次
            outfits.forEach((o) => {
                setTrueOutfits(prev => [...prev, o]);
            })
            setIndex(outfits.length);
        }
    }, [])

    // 布局函数转换为React中的样式对象函数
    const getTransformStyle = (i) => {
        if (i >= index - 1 && i <= index + 1) {
            const offsetStep = 100;
            const scaleStep = 0.6;
            const opacityStep = 0.5;
            const dis = Math.abs(i - index);
            const sign = i - index > 0 ? 1 : -1;
            const zIndex = 5 - dis; // 调整层级以适应React环境
            const scale = scaleStep ** dis;
            let rotateY = 45 * -sign;
            const opacity = opacityStep ** dis;
            let xOffset = (i - index) * offsetStep;
            if (i !== index) {
                xOffset = xOffset + 100 * sign;
            } else {
                rotateY = 0;
            }
            return {
                zIndex,
                transform: `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity,
            };
        } else {
            return {
                display: "none"
            }
        }
    };

    // 点击向前按钮处理函数
    const handlePrevClick = () => {
        setIndex(prevIndex => prevIndex - 1 == 1 ? trueOutfits.length - 2 : prevIndex - 1);
        // const imgs = [...images];
        // const tmp = imgs.pop();
        // imgs.unshift(tmp);
        // setImages([...imgs])
    };

    // 点击向后按钮处理函数
    const handleNextClick = () => {
        setIndex(prevIndex => prevIndex + 1 == trueOutfits.length - 1 ? trueOutfits.length / 2 - 1 : prevIndex + 1);
        // const imgs = [...images];
        // const tmp = imgs.shift();
        // imgs.push(tmp);
        // setImages([...imgs])
    };

    // 图片点击处理函数
    const handleImageClick = (i) => {
        setIndex(i);
    };

    return (
        <div className="carousel">
            <div className="carousel-wrapper">
                {trueOutfits.map((o, i) => (
                    <div key={i} className="carousel-item flex flex-col" style={getTransformStyle(i)}>
                        <img
                            src={o.src}
                            onClick={() => handleImageClick(i)}
                            alt=''
                        />
                        <div className='text-3xl text-white text-center'>{o.name}</div>
                    </div>

                ))}
            </div>
            <div className="indicator prev" onClick={handlePrevClick}>
                {'<'}
            </div>
            <div className="indicator next" onClick={handleNextClick}>
                {'>'}
            </div>
        </div>
    );
};

export default Carousel;