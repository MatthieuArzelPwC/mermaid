const defaultDiagram = `flowchart LR
    T1[Projet non technologique] --> C1[Investissement]
    C1 --> N1[Immobilier]
    N1 --> F1[[Comite Immobilier]]`;

export default {
  editor: {
    label: {
      en: 'Mermaid diagram',
      fr: 'Diagramme Mermaid',
    },
    icon: 'chart',
  },
  properties: {
    code: {
      label: {
        en: 'Mermaid code',
        fr: 'Code Mermaid',
      },
      section: 'settings',
      type: 'Textarea',
      bindable: true,
      defaultValue: defaultDiagram,
      options: {
        placeholder: 'flowchart LR\n    A[Start] --> B[End]',
      },
    },
    theme: {
      label: {
        en: 'Theme',
        fr: 'Theme',
      },
      section: 'style',
      type: 'TextSelect',
      defaultValue: 'default',
      options: {
        options: [
          { value: 'default', label: { en: 'Default', fr: 'Par defaut' } },
          { value: 'neutral', label: { en: 'Neutral', fr: 'Neutre' } },
          { value: 'dark', label: { en: 'Dark', fr: 'Sombre' } },
          { value: 'forest', label: { en: 'Forest', fr: 'Foret' } },
        ],
      },
    },
    backgroundColor: {
      label: {
        en: 'Canvas color',
        fr: 'Couleur du fond',
      },
      section: 'style',
      type: 'Color',
      defaultValue: '#ffffff',
      options: {
        nullable: true,
      },
    },
    minHeight: {
      label: {
        en: 'Minimum height',
        fr: 'Hauteur minimale',
      },
      section: 'style',
      type: 'Length',
      defaultValue: '320px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 2000 },
          { value: 'vh', label: 'vh', min: 0, max: 100 },
        ],
      },
    },
    centerDiagram: {
      label: {
        en: 'Center diagram',
        fr: 'Centrer le diagramme',
      },
      section: 'style',
      type: 'OnOff',
      defaultValue: true,
    },
  },
};
