import React from 'react';
import './SideDrawer.css'
import ReactDOM from "react-dom";

const SideDrawer = ({children}) => {
    const content = <aside className={'side-drawer'}>{children}</aside>
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))

};

export default SideDrawer;
