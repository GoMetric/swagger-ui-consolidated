import create from 'zustand';

export const useSchemasStore = create((set, get) => ({
  isReady: false,
  schemas: {},
  currentStandard: null,
  currentSchema: null,
  setSchemas: (schemas) => set(() => ({schemas, isReady: true})),
  fetchSchemas: async () => {
    try {
      const rawResponse = await fetch("/config.json");
      const processedResponse = await rawResponse.json();
      const { setSchemas } = get();

      setSchemas(processedResponse);
    } catch (error) {
      console.log('Error: while fetching configuration');
      console.log(error);
    }
  },
  setCurrentSchema: ({standard, slug, navigate}, callback) => {
    let nextSlug = slug;

    if (!nextSlug) {
      const { schemas } = get();
      nextSlug = schemas[standard][0].slug || '';
    }

    set({ currentStandard: standard, currentSchema: nextSlug });

    if (navigate instanceof Function) {
      navigate(`/${standard}/${nextSlug}`);
    }

    if (callback instanceof Function) {
      callback();
    }
  },
}));
