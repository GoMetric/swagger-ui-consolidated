import React, { useState, useEffect } from 'react';
import SchemaSelector from './SchemaSelector';
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";

const initSwaggerUi = function(url) {
    let ui = SwaggerUI({
        url,
        dom_id: '#swagger-ui-container',
    });
};

const mapStateToProps = (state) => {
    // find current schema config
    let currentSwaggerSchema = null;
    if (state && state.schemas && state.schemas.length > 0 && state.currentSchemaSlug) {
        for (let i = 0; i < state.schemas.length; i++) {
            if (state.schemas[i].slug === state.currentSchemaSlug) {
                currentSwaggerSchema = state.schemas[i];
                break;
            }
        }

    }

    return {
        currentSwaggerSchema: currentSwaggerSchema
    }
};

const mapDispatchToProps = dispatch => {
    return {
        /**
         * @param {string} schemaSlug
         */
        changeSwaggerSchema: (schemaSlug) => {
            dispatch(
                {
                    type: 'SWAGGER_SCHEMA_CHANGED',
                    schemaSlug
                }
            );
        }
    }
};

function Layout(props) {
    useEffect(() => {
        if (props.currentSwaggerSchema) {
            // build swagger ui
            initSwaggerUi(props.currentSwaggerSchema.url);
        }
    });

    // read schema slug from uri
    let params = useParams();
    if (params.schemaSlug) {
        props.changeSwaggerSchema(params.schemaSlug);
    }

    return (
        <div>
            <SchemaSelector />
            <div id="swagger-ui-container" />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
