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

const styles = {
    select: {
        fontSize: "18px",
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
                <select onChange={handleSchemaChange} style={styles.select}>
                    {
                        props.schemas.map(
                            schema => (<option value={schema.url} key={schema.url}>{schema.name} ({schema.url})</option>)
                        )
                    }
                </select>
            </div>
        );
    }

    return (
        <div className="swagger-ui">
            <div style={styles.root} className="wrapper block col-12">{selector}</div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SchemaSelector);
