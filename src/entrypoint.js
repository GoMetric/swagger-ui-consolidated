import React from 'react';
import ReactDOM from "react-dom";
import Layout from '/components/Layout.jsx';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// store
let initialState = {
    schemas: null,
    currentSchemaSlug: null
};

let store = createStore(
    function(state = initialState, action) {
        switch (action.type) {
            case 'CONFIG_LOADED':
                return {
                    ...state,
                    schemas: action.config.schemas,
                    currentSchemaSlug: state.currentSchemaSlug
                        ? state.currentSchemaSlug
                        : action.config.schemas[0].slug
                };
            case 'SWAGGER_SCHEMA_CHANGED':
                return {
                    ...state,
                    currentSchemaSlug: action.schemaSlug
                }
        }
    },
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware
        ),
    )
);

// render layout
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Layout/>} />
                <Route path="/schemas" element={<Layout/>}>
                    <Route path=":schemaSlug" element={<Layout/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

store.dispatch(
    (dispatch, getState) => {
        fetch("/config.json")
            .then(response => response.json())
            .then(config => {
                dispatch({
                    type: 'CONFIG_LOADED',
                    config
                })
            })
    }
);
