import React, { useState, useEffect } from 'react';
import {connect, Provider} from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import {PAGE_ASYNCAPI} from "./SchemaSelector";
import "@asyncapi/web-component/lib/asyncapi-web-component";

const mapStateToProps = (state) => {
    // find current schema config
    let currentAsyncApiSchema = null;
    if (state?.asyncApiSchemas?.length > 0 && state?.currentAsyncApiSchemaSlug) {
        currentAsyncApiSchema = state?.asyncApiSchemas.find(
            (item) => item.slug === state.currentAsyncApiSchemaSlug
        );
    }
    
    return {
        currentAsyncApiSchema,
        currentSlug: state?.currentAsyncApiSchemaSlug,
    }
};

const mapDispatchToProps = (dispatch) => ({
    changeSchema: (page, slug) => {
        dispatch(
            {
                type: 'SCHEMA_CHANGED',
                currentPage: page,
                slug: slug
            }
        );
    }
});

function AsyncApiPage({ currentAsyncApiSchema, currentSlug, changeSchema }) {
    const { schemaSlug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!!currentSlug && !!schemaSlug && currentSlug !== schemaSlug) {
            changeSchema(PAGE_ASYNCAPI, schemaSlug);
        }

        if (typeof schemaSlug === 'undefined' && currentSlug) {
            navigate(`/asyncapi/${currentSlug}`);
        }
    }, [currentSlug, schemaSlug]);

    if (!currentAsyncApiSchema || currentSlug !== schemaSlug) {
        return <div>Loading</div>;
    }

    const { url } = currentAsyncApiSchema;

    return (
        <>
            <asyncapi-component
                schemaUrl={url}
                cssImportPath="https://unpkg.com/@asyncapi/react-component@0.24.19/lib/styles/fiori.css">
            </asyncapi-component>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApiPage);
