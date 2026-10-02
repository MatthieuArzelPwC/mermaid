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
      type: 'Text',
      bindable: true,
      defaultValue: defaultDiagram,
      options: {
        code: true,
        language: 'text',
        placeholder: 'flowchart LR\n    A[Start] --> B[End]',
      },
    },
    backgroundColor: {
      label: {
        en: 'Background color',
        fr: 'Couleur de fond',
      },
      section: 'style',
      type: 'Color',
      defaultValue: '#ffffff',
      options: {
        nullable: true,
      },
    },
    borderColor: {
      label: {
        en: 'Border color',
        fr: 'Couleur des bordures',
      },
      section: 'style',
      type: 'Color',
      defaultValue: '#333333',
      options: {
        nullable: true,
      },
    },
    textColor: {
      label: {
        en: 'Text color',
        fr: 'Couleur du texte',
      },
      section: 'style',
      type: 'Color',
      defaultValue: '#333333',
      options: {
        nullable: true,
      },
    },
    accentColor: {
      label: {
        en: 'Accent color',
        fr: 'Couleur accent',
      },
      section: 'style',
      type: 'Color',
      defaultValue: '#d04a02',
      options: {
        nullable: true,
      },
    },
    subgraphColor: {
      label: {
        en: 'Subgraph color',
        fr: 'Couleur des sous-graphes',
      },
      section: 'style',
      type: 'Color',
      defaultValue: '#f4f4f4',
      options: {
        nullable: true,
      },
    },
    centerDiagram: {
      label: {
        en: 'Center diagram',
        fr: 'Centrer le diagramme',
      },
      section: 'settings',
      type: 'OnOff',
      defaultValue: true,
    },
  },
};
