import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { SchemaStandard } from '../constants';

import { useSchemasStore } from './useSchemasStore';

export const useSchemaStoreDefaults = () => {
  const schemaStore = useSchemasStore();
  const { slug } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    let standard = SchemaStandard.OPENAPI;

    if (pathname.includes(SchemaStandard.ASYNCAPI)) {
      standard = SchemaStandard.ASYNCAPI;
    }

    if (slug && standard && slug !== schemaStore.currentSchema) {
      schemaStore.setCurrentSchema({ standard, slug });
    }

  }, []);
};
