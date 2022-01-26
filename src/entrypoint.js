import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import {PAGE_OPENAPI, PAGE_ASYNCAPI} from "./components/SchemaSelector";

// store
let initialState = {
    currentPage: null,
    openApiSchemas: null,
    currentOpenApiSchemaSlug: null,
    asyncApiSchemas: null,
    currentAsyncApiSchemaSlug: null,
};

let store = createStore(
    function(state = initialState, action) {
        let newState;

        switch (action.type) {
            case 'CONFIG_LOADED':
                newState = {
                    ...state,
                    currentPage: null,
                    openApiSchemas: action.config.openapi,
                    currentOpenApiSchemaSlug: action.config.openapi[0].slug,
                    asyncApiSchemas: action.config.asyncapi,
                    currentAsyncApiSchemaSlug: action.config.asyncapi[0].slug
                };
                break;
            case 'SCHEMA_CHANGED':
                newState = {
                    ...state,
                    currentPage: action.currentPage
                }

                if (action.currentPage === PAGE_OPENAPI) {
                    newState.currentOpenApiSchemaSlug = action.slug;
                } else if (action.currentPage === PAGE_ASYNCAPI) {
                    newState.currentAsyncApiSchemaSlug = action.slug;
                }
                break;
            default:
                newState = state;
                break;
        }

        return newState;
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
            <Layout />
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
