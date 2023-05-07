import React from 'react';
import {NavLink} from 'react-router-dom'

function Menu(props) {
    return (
       <nav className='navbar navbar-expand-md navbar-dark bg-success'>
        <div className='container'>
            <NavLink to={`/`} className="navbar-brand">React-CRUD</NavLink>

            <button className='navbar-toggler' data-bs-toggle="collapse" data-bs-target="#demo">
                <span className='navbar-toggler-icon'></span>
            </button>

            <div className="collapse navbar-collapse" id="demo">
                <ul className="navbar-nav">
                    <li className='navbar-item'>
                        <NavLink to={`/home`} className="nav-link">Home</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav justify-content-between">
                    <li className='navbar-item'>
                        <NavLink to={`/create`} className="nav-link">Create</NavLink>
                    </li>
                </ul>
                <ul className='navbar-nav justify-content-between'>
                    <li className='navbar-item'>
                        <NavLink to={`/pnf`} className="nav-link">Pnf</NavLink>
                    </li>
                </ul>
            </div>
        </div>
       </nav>
    )
}

export default Menu;