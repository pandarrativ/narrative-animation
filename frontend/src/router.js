import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import StoryToPlotsPage from './pages/StoryToPlotsPage/StoryToPlotsPage';

export default function Routers(){  
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/story-to-plots' element={<StoryToPlotsPage/>} />
                
            </Routes>
        </BrowserRouter>
    )
};