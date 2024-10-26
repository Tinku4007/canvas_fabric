import React from 'react'
import {
    createBrowserRouter,
} from "react-router-dom";
import Home from '../page/Home';
import CanvasEditor from '../components/CanvasEditor';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/canvasEditor",
        element: <CanvasEditor/>,
    },
]);

export default router