import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';

export const PAGE_OPENAPI = 'openapi';
export const PAGE_ASYNCAPI = 'asyncapi';

const mapStateToProps = (state) => {
    return {
        currentPage: state && state.currentPage,
        openApiSchemas: state && state.openApiSchemas,
        currentOpenApiSchemaSlug: state && state.currentOpenApiSchemaSlug,
        asyncApiSchemas: state && state.asyncApiSchemas,
        currentAsyncApiSchemaSlug: state && state.currentAsyncApiSchemaSlug
    }
};

const styles = {
    root: {
        margin: '0 auto',
        maxWidth: '1460px',
        padding: '0 20px',
        width: '100%'
    },
    select: {
        fontSize: "18px",
    }
};

function SchemaSelector(props) {
    const navigate = useNavigate();

    const handleOpenApiSchemaChange = function(e) {
        const schemaSlug = e.target.value;
        navigate("/openapi/" + schemaSlug);
    };

    let openApiSelector = null;
    if (props.openApiSchemas && props.openApiSchemas.length > 0) {
        openApiSelector = (
            <select onChange={handleOpenApiSchemaChange} style={styles.select} value={props.currentOpenApiSchemaSlug}>
                {
                    props.openApiSchemas.map(
                        schema => (
                            <option value={schema.slug} key={schema.slug}>
                                {schema.name} ({schema.url})
                            </option>
                        )
                    )
                }
            </select>
        );
    }

    const handleAsyncApiSchemaChange = function(e) {
        const schemaSlug = e.target.value;
        navigate("/asyncapi/" + schemaSlug);
    };

    let asyncApiSelector = null;
    if (props.asyncApiSchemas && props.asyncApiSchemas.length > 0) {
        asyncApiSelector = (
            <select onChange={handleAsyncApiSchemaChange} style={styles.select} value={props.currentAsyncApiSchemaSlug}>
                {
                    props.asyncApiSchemas.map(
                        schema => (
                            <option value={schema.slug} key={schema.slug}>
                                {schema.name} ({schema.url})
                            </option>
                        )
                    )
                }
            </select>
        );
    }

    let visibleSelector = null;
    if (props.currentPage === PAGE_OPENAPI) {
        visibleSelector = openApiSelector;
    } else if (props.currentPage === PAGE_ASYNCAPI) {
        visibleSelector = asyncApiSelector;
    }

    let handlePageSelect = function (e) {
        e.preventDefault();
        navigate(e.target.getAttribute('href'));
        return false;
    }

    return (
        <div style={styles.root}>
            <ul>
                <li><a href="/openapi" onClick={handlePageSelect}>OpenApi specifications</a></li>
                <li><a href="/asyncapi" onClick={handlePageSelect}>AsyncApi specifications</a></li>
            </ul>
            {visibleSelector}
        </div>
    );
}

export default connect(mapStateToProps)(SchemaSelector);
