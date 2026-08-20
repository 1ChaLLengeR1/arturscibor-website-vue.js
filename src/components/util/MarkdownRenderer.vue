<template>
  <div class="markdown-renderer" v-html="html"></div>
</template>

<script>
import { computed } from "vue";
import { renderMarkdown } from "../../utils/markdown";

export default {
  props: {
    source: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const html = computed(() => renderMarkdown(props.source));
    return { html };
  },
};
</script>

<style lang="scss" scoped>
.markdown-renderer {
  font-size: 1rem;
  text-align: left;

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4) {
    color: var(--main-color);
    margin: 0.75rem 0 0.5rem;
    line-height: 1.3;
  }

  :deep(h1) {
    font-size: 1em;
  }

  :deep(h2) {
    font-size: 1.25em;
  }

  :deep(h3) {
    font-size: 1.1em;
  }

  :deep(h4) {
    font-size: 1em;
  }

  :deep(p) {
    font-size: 1em;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  :deep(ul),
  :deep(ol) {
    font-size: 1em;
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  :deep(li) {
    margin: 0.25rem 0;
  }

  :deep(a) {
    color: var(--main-color);
    text-decoration: underline;
  }

  :deep(strong) {
    font-weight: 300;
  }

  :deep(blockquote) {
    border-left: 3px solid var(--main-color);
    margin: 0.5rem 0;
    padding-left: 1rem;
    opacity: 0.85;
    font-style: italic;
  }

  :deep(code) {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  :deep(pre) {
    background: rgba(0, 0, 0, 0.35);
    padding: 0.75rem;
    border-radius: 8px;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
    }
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin: 1rem 0;
  }

  :deep(img) {
    max-width: 100%;
  }
}
</style>
