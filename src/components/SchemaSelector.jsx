import React, {useEffect} from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        swaggerSchemaUrl: state && state.swaggerSchemaUrl
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
    useEffect(() => {
        props.changeSwaggerSchemaUrl("https://petstore.swagger.io/v2/swagger.json");
    });

    return (
        <div>Schema selector</div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SchemaSelector);
