import React, { useState, useEffect } from 'react';
import SchemaSelector from './SchemaSelector';
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css';
import { connect } from 'react-redux';

const initSwaggerUi = function(url) {
    let ui = SwaggerUI({
        url,
        dom_id: '#swagger-ui-container',
    });
};

const mapStateToProps = (state) => {
    return {
        currentSwaggerSchemaUrl: state && state.currentSwaggerSchemaUrl
    }
};

function Layout(props) {
    useEffect(() => {
        if (props.currentSwaggerSchemaUrl) {
            initSwaggerUi(props.currentSwaggerSchemaUrl)
        }
    });

    return (
        <div>
            <SchemaSelector />
            <div id="swagger-ui-container" />
        </div>
    );
}

export default connect(mapStateToProps, null)(Layout);
