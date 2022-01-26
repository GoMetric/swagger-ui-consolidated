import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

export const PAGE_OPENAPI = 'openapi';
export const PAGE_ASYNCAPI = 'asyncapi';

const mapStateToProps = (state) => {
    return {
        openApiSchemas: state?.openApiSchemas,
        currentOpenApiSchemaSlug: state?.currentOpenApiSchemaSlug,
        asyncApiSchemas: state?.asyncApiSchemas,
        currentAsyncApiSchemaSlug: state?.currentAsyncApiSchemaSlug
    }
};

const mapDispatchToProps = (dispatch) => ({
    changeSchema: (page, slug) => {
        dispatch(
            {
                type: 'SCHEMA_CHANGED',
                page: page,
                slug: slug
            }
        );
    }
});

function SchemaSelector(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenApiSchemaChange = function(e) {
        const schemaSlug = e.target.getAttribute('slug');
        navigate("/openapi/" + schemaSlug);
        setMenu(null);
    };

    const handleAsyncApiSchemaChange = function(e) {
        const schemaSlug = e.target.getAttribute('slug');
        navigate("/asyncapi/" + schemaSlug);
        setMenu(null);
    };

    const closeMenuHandler = function(e) {
        setMenu(null);
    }

    const [menu, setMenu] = React.useState(null);

    const handleButtonClick = function (event) {
        setMenu(event.currentTarget);
    };

    let schemas = null;
    let schemaChangeHandler = null;
    let currentSchemaSlug = null;
    if (location.pathname.indexOf('/' + PAGE_OPENAPI) === 0) {
        schemas = props.openApiSchemas;
        schemaChangeHandler = handleOpenApiSchemaChange;
        currentSchemaSlug = props.currentOpenApiSchemaSlug;
    } else if (location.pathname.indexOf('/' + PAGE_ASYNCAPI) === 0) {
        schemas = props.asyncApiSchemas;
        schemaChangeHandler = handleAsyncApiSchemaChange;
        currentSchemaSlug = props.currentAsyncApiSchemaSlug;
    } else {
        return (<div></div>);
    }

    if (!schemas || schemas.length === 0 || !currentSchemaSlug) {
        return (<div></div>);
    }

    let currentSchema = schemas.find((schema) => schema.slug === currentSchemaSlug);

    return (
        <div>
            <Button color="inherit" onClick={handleButtonClick}>
                <span>
                    {currentSchema.name}
                </span>
            </Button>
            <Menu open={Boolean(menu)} anchorEl={menu} onClose={closeMenuHandler}>
            {
                schemas.map(
                    schema => (
                        <MenuItem
                            component="a"
                            data-no-link="true"
                            key={schema.slug}
                            selected={schema.slug === currentSchema.slug}
                            slug={schema.slug}
                            onClick={schemaChangeHandler}
                        >
                            {schema.name}
                        </MenuItem>
                    )
                )
            }
            </Menu>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SchemaSelector);
