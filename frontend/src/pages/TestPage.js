import React from 'react';
import {Outlet} from 'react-router-dom'

const TestPage = () => {
    return (
        <div>
            <h1>Description</h1>
            <Outlet />
        </div>
    );
}

export default TestPage;
