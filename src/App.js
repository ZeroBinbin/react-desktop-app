import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Menu, Icon} from 'antd';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/style/index.css';

const fs = require('fs');
const path = require('path');

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const PARAMS_PATH = path.resolve(__dirname, '/my-app/save/initParams.json');

class App extends Component {
    componentWillMount() {
        //console.log(__dirname);
        const initParams = JSON.parse(fs.readFileSync(PARAMS_PATH, 'utf-8'));
        this.setState({initParams});
    }

    render() {
        return <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <div style={{ position: 'absolute', top: 0, height: 50, left: 0, right: 0 }}>
                <Menu mode="horizontal">
                    <SubMenu key="file" title="文件">
                        <MenuItem key="open"><div style={{ width: '100%', height: '100%' ,position: 'relative'}}>
                            <input type="file" className="file-upload" onChange={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                this.setState({
                                    initParams: {...this.state.initParams, routerConfigPath: e.target.value}
                                }, () => {
                                    fs.writeFileSync(PARAMS_PATH, JSON.stringify(this.state.initParams, null, 2), 'utf-8');
                                })
                            }} />打开</div>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </div>
            <div style={{ position: 'absolute', top: 50 ,left: 0, right: 0, bottom: 0 }}>
                {this.state.initParams && this.state.initParams.routerConfigPath ? (
                    <div className="App">
                        <div
                            style={{width: 180, position: 'absolute', top: 0, left: 0, bottom: 0, boxSizing: 'border-box'}}>
                            <Menu style={{width: 180, boxSizing: 'border-box'}} mode="inline">
                                <SubMenu key="parent" title={"父菜单"}>
                                    <MenuItem key="kinginyellow">子菜单aa</MenuItem>
                                </SubMenu>
                            </Menu>
                        </div>
                    </div>
                ) : ([<div style={{ height: '10%' }}></div>,<div style={{margin: '0 auto', width: '70%', height: '80%', textAlign: 'center', cursor: 'pointer', border: '2px dashed #c0c0c0', borderRadius: '10px', position: 'relative'}}
                          onDrop={e => {
                              e.stopPropagation();
                              e.preventDefault();
                              this.setState({
                                  initParams: {...this.state.initParams, routerConfigPath: e.dataTransfer.files[0].path}
                              }, () => {
                                  fs.writeFileSync(PARAMS_PATH, JSON.stringify(this.state.initParams, null, 2), 'utf-8');
                              })
                          }}
                          onDragEnter={e => {
                              e.stopPropagation();
                              e.preventDefault();
                          }}
                          onDragOver={e => {
                              e.stopPropagation();
                              e.preventDefault();
                          }}
                >
                    <input onChange={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        this.setState({
                            initParams: {...this.state.initParams, routerConfigPath: e.target.value}
                        }, () => {
                            fs.writeFileSync(PARAMS_PATH, JSON.stringify(this.state.initParams, null, 2), 'utf-8');
                        }) }} type="file" className="file-upload"  />
                    <Icon
                        style={{
                            fontSize: '200px',
                            position: 'absolute',
                            top: '50%',
                            marginTop: '-100px',
                            left: '50%',
                            marginLeft: '-100px',
                            cursor: 'pointer'
                        }} type="plus-square-o"

                    />
                </div>])}
            </div>
        </div>;
    }
}

export default App;
