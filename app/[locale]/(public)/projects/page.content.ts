import { t, type Dictionary } from 'intlayer';

const asyncContent = {
  key: 'async',
  content: {
    myWork: t({ en: "My Work" }),
    aCollectionOfMyProjects: t({ en: "A collection of my projects." }),
    noProjectsHaveBeenAdded: t({ en: "No projects have been added yet." })
  },
} satisfies Dictionary;

export default asyncContent;
