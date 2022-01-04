import React from 'react';
import ReactDOM from "react-dom";
import Layout from '/components/Layout.jsx';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

// store
let initialState = {
    schemas: null,
    currentSwaggerSchema: null
};

let store = createStore(
    function(state = initialState, action) {
        switch (action.type) {
            case 'CONFIG_LOADED':
                return {
                    ...state,
                    schemas: action.config.schemas,
                    /** {slug: string, url: string: name: string} */
                    currentSwaggerSchema: action.config.schemas[0]
                };
            case 'SWAGGER_SCHEMA_CHANGED':
                return {
                    ...state,
                    /** {slug: string, url: string: name: string} */
                    currentSwaggerSchema: action.swaggerSchema
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
        <Layout/>
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
