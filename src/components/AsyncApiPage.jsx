import React, { useState, useEffect } from 'react';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import Typography from "@mui/material/Typography";

import { useSchemasStore, useSchemaStoreDefaults } from '../hooks'

function AsyncApiPage() {
    const schemasStore = useSchemasStore();
    const [schemaUrl, setSchemaUrl] = useState('');

    useSchemaStoreDefaults();

    useEffect(() => {
        if (schemasStore.currentSchema && schemasStore.currentStandard) {
            const schemaSelected = schemasStore.schemas[schemasStore.currentStandard].find(
              schema => schema.slug === schemasStore.currentSchema
            );

            if (schemaSelected?.url) {
                setSchemaUrl(schemaSelected?.url ?? '');
            }
        }
    }, [schemasStore.currentStandard, schemasStore.currentStandard]);


    if (!schemaUrl) {
        return <Typography component="h1" align="center">No AsyncApi Schemas</Typography>;
    }

    return (
        <>
            <asyncapi-component
                schemaUrl={schemaUrl}
                cssImportPath="https://unpkg.com/@asyncapi/react-component@0.24.19/lib/styles/fiori.css">
            </asyncapi-component>
        </>
    );
}

export default AsyncApiPage;
