import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
            <Select onChange={handleOpenApiSchemaChange} value={props.currentOpenApiSchemaSlug}>
                {
                    props.openApiSchemas.map(
                        schema => (
                            <MenuItem value={schema.slug} key={schema.slug}>
                                {schema.name} ({schema.url})
                            </MenuItem>
                        )
                    )
                }
            </Select>
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
            <Select onChange={handleAsyncApiSchemaChange} value={props.currentAsyncApiSchemaSlug}>
                {
                    props.asyncApiSchemas.map(
                        schema => (
                            <MenuItem value={schema.slug} key={schema.slug}>
                                {schema.name}
                            </MenuItem>
                        )
                    )
                }
            </Select>
        );
    }

    let visibleSelector = null;
    if (location.pathname.includes(PAGE_OPENAPI)) {
        visibleSelector = openApiSelector;
    } else if (location.pathname.includes(PAGE_ASYNCAPI)) {
        visibleSelector = asyncApiSelector;
    }

    return (<div>{visibleSelector}</div>);
}

export default connect(mapStateToProps, mapDispatchToProps)(SchemaSelector);
