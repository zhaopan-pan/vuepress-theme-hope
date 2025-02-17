import { defineComponent, h } from "vue";
import { usePageFrontmatter } from "@vuepress/client";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import HomeFeatures from "@theme-hope/components/HomeFeatures";
import MarkdownContent from "@theme-hope/components/MarkdownContent";
import HomeHero from "@theme-hope/components/HomeHero";
import { usePure } from "@theme-hope/composables/index";

import type { VNode } from "vue";
import type { ThemeProjectHomePageFrontmatter } from "../../shared/index.js";

import "../styles/home-page.scss";

export default defineComponent({
  name: "HopePage",

  setup(_props, { slots }) {
    const pure = usePure();
    const frontmatter = usePageFrontmatter<ThemeProjectHomePageFrontmatter>();

    return (): VNode =>
      h(
        "main",
        {
          class: ["home project", { pure: pure.value }],
          id: "main-content",
          "aria-labelledby":
            frontmatter.value.heroText === null ? undefined : "main-title",
        },
        [
          slots["top"]?.(),
          h(HomeHero),
          h(DropTransition, { appear: true, delay: 0.16 }, () =>
            h(HomeFeatures)
          ),
          slots["center"]?.(),
          h(DropTransition, { appear: true, delay: 0.24 }, () =>
            h(MarkdownContent, { custom: true })
          ),
          slots["bottom"]?.(),
        ]
      );
  },
});
