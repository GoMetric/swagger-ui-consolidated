import React, {useEffect} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    let schemas = [];
    let currentSwaggerSchemaUrl = null;

    if (state && state.schemas && state.schemas.length > 0) {
        schemas = state.schemas;

        if (!state.currentSwaggerSchemaUrl) {
            currentSwaggerSchemaUrl = state.currentSwaggerSchemaUrl;
        }
    }

    return {
        schemas,
        currentSwaggerSchemaUrl
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeSwaggerSchemaUrl: (swaggerSchemaUrl) => {
            dispatch(
                {
                    type: 'SWAGGER_SCHEMA_CHANGED',
                    swaggerSchemaUrl
                }
            );
        }
    }
};

function SchemaSelector(props) {
    const handleSchemaChange = function(e) {
        const schemaUrl = e.target.value;
        props.changeSwaggerSchemaUrl(schemaUrl);
    };

    let selector = null;
    if (props.schemas && props.schemas.length > 0) {
        selector = (
            <div>
                <select onChange={handleSchemaChange}>
                    {
                        props.schemas.map(
                            schema => (<option value={schema.url} key={schema.url}>{schema.name}</option>)
                        )
                    }
                </select>
            </div>
        );
    }

    return (
        <div>{selector}</div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SchemaSelector);
