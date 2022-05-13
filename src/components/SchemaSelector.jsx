import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import { useSchemasStore } from '../hooks';

function SchemaSelector() {
    const navigate = useNavigate();
    const schemasStore = useSchemasStore();
    const [menu, setMenu] = React.useState(null);

    const handleSchemaChange = function(e) {
        const schemaSlug = e.target.getAttribute('slug');
        schemasStore.setCurrentSchema({
            standard: schemasStore.currentStandard,
            slug: schemaSlug
        },
          () => {
              navigate(`/${schemasStore.currentStandard}/` + schemaSlug);
              setMenu(null);
          });
    };

    const closeMenuHandler = function(e) {
        setMenu(null);
    }

    const handleButtonClick = function (event) {
        setMenu(event.currentTarget);
    };

    let schemas = schemasStore.schemas[schemasStore.currentStandard];

    if (!schemas || schemas.length === 0) {
        return null;
    }

    let currentSchema = schemas.find((schema) => schema.slug === schemasStore.currentSchema);

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
                            onClick={handleSchemaChange}
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

export default SchemaSelector;
