import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { RekaOutlet } from './components/RekaOutlet/RekaOutlet';
import {Archive} from "./pages/archive/Archive";
import {NotFound} from "./pages/NotFoundPage/NotFound";
import {frontend_routes} from "./routes/frontend";


function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route element={<RekaOutlet />}>
                    <Route path={frontend_routes.home} element={<Home />} />
                    <Route path={frontend_routes.archive} >
                        <Route path=":archiveRef" element={<Archive/>}/>
                    </Route>
                    <Route path={"*"} element={<NotFound/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
