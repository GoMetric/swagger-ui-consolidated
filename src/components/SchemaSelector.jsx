import React, {useEffect} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    let schemas = [];
    let currentSwaggerSchema = null;

    if (state && state.schemas && state.schemas.length > 0) {
        schemas = state.schemas;

        if (!state.currentSwaggerSchema) {
            currentSwaggerSchema = state.currentSwaggerSchema;
        }
    }

    return {
        schemas,
        currentSwaggerSchema
    }
};

const styles = {
    select: {
        fontSize: "18px",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeSwaggerSchema: (schemaConfig) => {
            dispatch(
                {
                    type: 'SWAGGER_SCHEMA_CHANGED',
                    schemaConfig /** {slug: string, url: string: name: string} */
                }
            );
        }
    }
};

function SchemaSelector(props) {
    const handleSchemaChange = function(e) {
        const schemaSlug = e.target.value;

        for (let i = 0; i < props.schemas.length; i++) {
            if (props.schemas[i].slug === schemaSlug) {
                props.changeSwaggerSchema(props.schemas[i]);
                break;
            }
        }
    };

    let selector = null;
    if (props.schemas && props.schemas.length > 0) {
        selector = (
            <div>
                <select onChange={handleSchemaChange} style={styles.select}>
                    {
                        props.schemas.map(
                            schema => (
                                <option value={schema.slug} key={schema.url}>
                                    {schema.name} ({schema.url})
                                </option>
                            )
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
