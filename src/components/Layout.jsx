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
        currentSwaggerSchema: state && state.currentSwaggerSchema
    }
};

function Layout(props) {
    useEffect(() => {
        if (props.currentSwaggerSchema) {
            initSwaggerUi(props.currentSwaggerSchema.url)
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
