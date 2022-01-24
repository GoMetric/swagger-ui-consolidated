import React, { useState, useEffect } from 'react';
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css';
import { connect } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import {PAGE_OPENAPI} from "./SchemaSelector";

const initSwaggerUi = function(url) {
    let ui = SwaggerUI({
        url,
        dom_id: '#swagger-ui-container',
    });
};

const mapStateToProps = (state) => {
    // find current schema config
    let currentOpenApiSchema = null;
    if (state && state.openApiSchemas && state.openApiSchemas.length > 0 && state.currentOpenApiSchemaSlug) {
        for (let i = 0; i < state.openApiSchemas.length; i++) {
            if (state.openApiSchemas[i].slug === state.currentOpenApiSchemaSlug) {
                currentOpenApiSchema = state.openApiSchemas[i];
                break;
            }
        }

    }

    return {
        currentOpenApiSchema: currentOpenApiSchema
    }
};

const mapDispatchToProps = dispatch => {
    return {
        /**
         * @param {string} slug
         */
        changeSchema: (slug) => {
            dispatch(
                {
                    type: 'SCHEMA_CHANGED',
                    currentPage: PAGE_OPENAPI,
                    slug: slug
                }
            );
        }
    }
};

function OpenApiPage(props) {
    // read schema slug from uri
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!params.schemaSlug && props.currentOpenApiSchema) {
            navigate("/openapi/" + props.currentOpenApiSchema.slug)
        }
    });

    useEffect(() => {
        // build swagger ui
        if (params.schemaSlug && props.currentOpenApiSchema) {
            props.changeSchema(params.schemaSlug);

            if (params.schemaSlug === props.currentOpenApiSchema.slug) {
                initSwaggerUi(props.currentOpenApiSchema.url);
            }
        }
    });

    return (
        <div>
            <div id="swagger-ui-container" />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenApiPage);
