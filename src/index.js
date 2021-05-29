import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import AreaPreferencesManage from "./parts/AreaPreferences/AreaPreferencesManage";

ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
    <div className={'mapsContainer'}>

    {/*<div>this is a div</div>*/}

      <AreaPreferencesManage/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

if(module.hot)
{
    module.hot.accept();
}
