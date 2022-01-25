import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

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
    const location = useLocation();

    const currentSlug = location.pathname.split('/')[1] ?? null;

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
        props.changeSchema(PAGE_ASYNCAPI, schemaSlug);
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
    if (location.pathname.includes(PAGE_OPENAPI)) {
        visibleSelector = openApiSelector;
    } else if (location.pathname.includes(PAGE_ASYNCAPI)) {
        visibleSelector = asyncApiSelector;
    }

    return (
        <div style={styles.root}>
            {visibleSelector}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SchemaSelector);
