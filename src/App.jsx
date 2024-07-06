import Index from "./pages/index/Index"
import SelectTarget from "./pages/selectTarget/SelectTarget"
import './App.css';
import { useEffect, useState } from 'react';
import globalStore from './states/global'
import ChangeOutfit from "./pages/changeOutfit/ChangeOutfit";
import Chat from "./pages/chat/Chat";

const App = () => {
  // 定义状态来存储当前显示的组件
  const { curPage } = globalStore();
  // 定义一个函数来渲染当前组件
  const renderPage = () => {
    if (curPage === 'index') {
      return <Index />;
    } else if (curPage === 'selectTarget') {
      return <SelectTarget />;
    } else if (curPage == "changeOutfit") {
      return <ChangeOutfit />
    } else if (curPage == "chat") {
      return <Chat />
    }
  }

  useEffect(() => {
    const img = new Image();
    img.src = "./pages/index/bg.png"
    img.onload = () => { }
  }, [])

  return (
    <div className="w-[100vw] h-[100vh] relative">
      {renderPage()}
    </div>
  );
}

export default App;
