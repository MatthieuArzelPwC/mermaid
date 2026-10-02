<template>
  <div class="mermaid-element">
    <p v-if="errorMessage" class="mermaid-element__error" role="alert">
      {{ errorMessage }}
    </p>
    <div
      v-else
      ref="diagramContainer"
      class="mermaid-element__diagram"
      :class="{ 'mermaid-element__diagram--centered': shouldCenter }"
      aria-live="polite"
    ></div>
  </div>
</template>

<script>
import mermaid from 'mermaid';

let diagramSequence = 0;

function normalizeCode(value) {
  if (typeof value !== 'string') return '';

  return value
    .trim()
    .replace(/^```(?:mermaid)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
}

function applyDirection(code, direction) {
  if (!code) return '';

  if (/^\s*(flowchart|graph)\b/i.test(code)) {
    return code.replace(/^\s*(flowchart|graph)(?:\s+(?:TB|TD|BT|RL|LR))?\b/i, `$1 ${direction}`);
  }

  return code;
}

function errorText(error) {
  if (error instanceof Error && error.message) return error.message;
  return String(error || 'Erreur Mermaid inconnue');
}

export default {
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: true },
  },
  data() {
    return {
      errorMessage: '',
      renderVersion: 0,
    };
  },
  computed: {
    diagramCode() {
      const direction = this.content.leftToRight === false ? 'TB' : 'LR';
      return applyDirection(normalizeCode(this.content.code), direction);
    },
    diagramColors() {
      return {
        backgroundColor: this.content.backgroundColor || '#ffffff',
        borderColor: this.content.borderColor || '#333333',
        textColor: this.content.textColor || '#333333',
      };
    },
    shouldCenter() {
      return this.content.centerDiagram !== false;
    },
  },
  watch: {
    diagramCode: {
      immediate: true,
      handler() {
        this.scheduleRender();
      },
    },
    diagramColors: {
      deep: true,
      handler() {
        this.scheduleRender();
      },
    },
  },
  beforeUnmount() {
    this.renderVersion += 1;
  },
  methods: {
    resolveColor(value, fallback) {
      if (typeof value !== 'string' || !value.trim()) return fallback;

      const variableMatch = value.trim().match(/^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/);
      if (variableMatch) {
        const variableValue = window.getComputedStyle(this.$el).getPropertyValue(variableMatch[1]).trim();
        return this.resolveColor(variableValue || variableMatch[2], fallback);
      }

      const probe = document.createElement('span');
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      probe.style.color = value;
      this.$el.appendChild(probe);

      const resolvedColor = window.getComputedStyle(probe).color;
      probe.remove();

      return resolvedColor && resolvedColor !== 'canvastext' ? resolvedColor : fallback;
    },
    resolveDiagramColors() {
      const backgroundColor = this.resolveColor(this.diagramColors.backgroundColor, '#ffffff');
      const borderColor = this.resolveColor(this.diagramColors.borderColor, '#333333');
      const textColor = this.resolveColor(this.diagramColors.textColor, '#333333');

      return {
        primaryColor: backgroundColor,
        primaryBorderColor: borderColor,
        primaryTextColor: textColor,
        secondaryColor: backgroundColor,
        secondaryBorderColor: borderColor,
        secondaryTextColor: textColor,
        tertiaryColor: backgroundColor,
        tertiaryBorderColor: borderColor,
        tertiaryTextColor: textColor,
        nodeBorder: borderColor,
        clusterBkg: backgroundColor,
        clusterBorder: borderColor,
        titleColor: textColor,
        edgeLabelBackground: backgroundColor,
        lineColor: textColor,
        textColor,
      };
    },
    async scheduleRender() {
      const version = ++this.renderVersion;
      this.errorMessage = '';

      await this.$nextTick();
      if (version !== this.renderVersion) return;

      if (!this.diagramCode) {
        if (this.$refs.diagramContainer) this.$refs.diagramContainer.replaceChildren();
        return;
      }

      try {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: this.resolveDiagramColors(),
        });

        const id = `mermaid-${this.uid.replace(/[^a-zA-Z0-9_-]/g, '-')}-${++diagramSequence}`;
        const { svg, bindFunctions } = await mermaid.render(id, this.diagramCode);

        if (version !== this.renderVersion || !this.$refs.diagramContainer) return;

        this.$refs.diagramContainer.innerHTML = svg;
        if (typeof bindFunctions === 'function') {
          bindFunctions(this.$refs.diagramContainer);
        }
      } catch (error) {
        if (version !== this.renderVersion) return;

        this.errorMessage = `Diagramme Mermaid invalide : ${errorText(error)}`;
      }
    },
  },
};
</script>

<style scoped>
.mermaid-element {
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
}

.mermaid-element__diagram {
  box-sizing: border-box;
  width: 100%;
  min-width: max-content;
}

.mermaid-element__diagram--centered {
  display: flex;
  justify-content: center;
}

.mermaid-element__diagram :deep(svg) {
  display: block;
  max-width: 100%;
  height: auto;
}

.mermaid-element__error {
  box-sizing: border-box;
  margin: 0;
  padding: 12px 16px;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>
