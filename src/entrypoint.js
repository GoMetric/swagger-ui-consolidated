import React from 'react';
import ReactDOM from "react-dom";
import Layout from '/components/Layout.jsx';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

// store
let initialState = {
    swaggerSchemaUrl: null
};

let store = createStore(
    function(state = initialState, action) {
        switch (action.type) {
            case 'SWAGGER_SCHEMA_CHANGED':
                return {
                    ...state,
                    swaggerSchemaUrl: action.swaggerSchemaUrl
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
