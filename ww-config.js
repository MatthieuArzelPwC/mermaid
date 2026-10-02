const defaultDiagram = `flowchart
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
        placeholder: 'flowchart\n    A[Start] --> B[End]',
        rows: 12,
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
    leftToRight: {
      label: {
        en: 'Left to right',
        fr: 'Gauche vers droite',
      },
      section: 'settings',
      type: 'OnOff',
      bindable: true,
      defaultValue: true,
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
