import React, {useEffect} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        schemas: state && state.schemas,
        currentSchemaSlug: state && state.currentSchemaSlug
    }
};

const styles = {
    select: {
        fontSize: "18px",
    }
};

const mapDispatchToProps = dispatch => {
    return {
        /**
         * @param {string} schemaSlug
         */
        changeSwaggerSchema: (schemaSlug) => {
            dispatch(
                {
                    type: 'SWAGGER_SCHEMA_CHANGED',
                    schemaSlug
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
                props.changeSwaggerSchema(props.schemas[i].slug);
                break;
            }
        }
    };

    let selector = null;
    if (props.schemas && props.schemas.length > 0) {
        selector = (
            <div>
                <select onChange={handleSchemaChange} style={styles.select} value={props.currentSchemaSlug}>
                    {
                        props.schemas.map(
                            schema => (
                                <option value={schema.slug} key={schema.slug}>
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
