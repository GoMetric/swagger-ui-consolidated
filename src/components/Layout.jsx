import React from 'react';
import SchemaSelector from "./SchemaSelector";
import {Route, Routes} from "react-router-dom";
import WelcomePage from '/components/WelcomePage.jsx';
import OpenApiPage from '/components/OpenApiPage.jsx';
import AsyncApiPage from '/components/AsyncApiPage.jsx';

export default function Layout() {
    return (
        <div>
            <SchemaSelector />
            <div>
                <Routes>
                    <Route path="*" element={<WelcomePage/>} />
                    <Route path="/openapi" element={<OpenApiPage/>}>
                        <Route path=":schemaSlug" element={<OpenApiPage/>} />
                    </Route>
                    <Route path="/asyncapi" element={<AsyncApiPage/>}>
                        <Route path=":schemaSlug" element={<AsyncApiPage/>} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};
