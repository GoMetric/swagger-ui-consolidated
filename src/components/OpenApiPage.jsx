import React, { useEffect } from 'react';
import SwaggerUI from 'swagger-ui';
import Typography from "@mui/material/Typography";

import { useSchemasStore, useSchemaStoreDefaults } from '../hooks';

import 'swagger-ui/dist/swagger-ui.css';

const initSwaggerUi = (url) => {
    SwaggerUI({
        url,
        dom_id: '#swagger-ui-container',
    });
};

function OpenApiPage() {
    const schemasStore = useSchemasStore();

    useSchemaStoreDefaults();

    useEffect(() => {
        if (schemasStore.currentSchema && schemasStore.currentStandard) {
            const schemaSelected = schemasStore.schemas[schemasStore.currentStandard].find(
              schema => schema.slug === schemasStore.currentSchema
            );

            if (schemaSelected?.url) {
                initSwaggerUi(schemaSelected?.url);
            }
        }
    }, [schemasStore.currentStandard, schemasStore.currentStandard]);

    if (!schemasStore.currentStandard) {
        return <Typography component="h1" align="center">No OpenApi Schemas</Typography>;
    }

    return (
        <div>
            <div id="swagger-ui-container" />
        </div>
    );
}

export default OpenApiPage;
