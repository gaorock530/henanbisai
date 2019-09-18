import React from 'react';
import logo from './logo.svg';
import './App.css';
import wxconfig from './utils/wxconfig';
const wx = window.wx;

class App extends React.PureComponent {

  async componentDidMount () {
    const config = await wxconfig();

    wx.config(config);
  
    wx.ready(function(){
      wx.updateAppMessageShareData({ 
        title: '中原青少年艺术赛事网', // 分享标题
        desc: '中原青少年艺术赛事网的描述', // 分享描述
        link: 'https://yingxitech.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://yingxitech.com/apple-touch-icon.png', // 分享图标
        success: function () {
          // 设置成功
        }
      })
    });
  }
  
  
  

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          中原青少年艺术赛事网
          </p>
          
        </header>
      </div>
    );
  }
  
}

export default App;
