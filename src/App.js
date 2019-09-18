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
      });

      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          const speed = res.speed; // 速度，以米/每秒计
          const accuracy = res.accuracy; // 位置精度
          const location = JSON.stringify({latitude, longitude, speed, accuracy});
          localStorage.setItem('location', location)
        }
      });
    });
  }
  
  openLocation () {
    const location = localStorage.getItem('location');
    if (!location) return;
    const obj = JSON.parse(location);
    wx.openLocation({
      latitude: obj.latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: obj.longitude, // 经度，浮点数，范围为180 ~ -180。
      name: '', // 位置名
      address: '', // 地址详情说明
      scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    });
  }
  

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.openLocation}>
          中原青少年艺术赛事网
          </p>
          
        </header>
      </div>
    );
  }
  
}

export default App;
