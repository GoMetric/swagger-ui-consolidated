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
    }
};

const mapDispatchToProps = (dispatch) => ({
    /**
     * @param {string} slug
     */
    changeSchema: (slug) => {
        if (!slug) {
            return;
        }

        dispatch(
            {
                type: 'SCHEMA_CHANGED',
                currentPage: PAGE_ASYNCAPI,
                slug: slug
            }
        );
    }
});

function AsyncApiPage(props) {
    const urlParams = useParams();
    const navigate = useNavigate();
    const currentSlug = props?.currentAsyncApiSchema?.slug;

    useEffect(() => {
        if (!urlParams.schemaSlug && props.currentAsyncApiSchema) {
            navigate(`/asyncapi/${props.currentAsyncApiSchema.slug}`);
            props.changeSchema(props.currentAsyncApiSchema.slug);
        }
    }, [currentSlug, urlParams.schemaSlug]);

    useEffect(() => {
        if (!!currentSlug && !!urlParams.schemaSlug && currentSlug !== urlParams.schemaSlug) {
            props.changeSchema(urlParams.schemaSlug);
        }
    }, [currentSlug, urlParams.schemaSlug]);



    if (!props.currentAsyncApiSchema) {
        return <div>Loading</div>;
    }

    const { url } = props.currentAsyncApiSchema;

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
