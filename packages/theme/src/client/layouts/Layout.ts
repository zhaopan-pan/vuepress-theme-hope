import { computed, defineComponent, h, resolveComponent } from "vue";
import { usePageData, usePageFrontmatter } from "@vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import SkipLink from "@theme-hope/components/SkipLink";
import { useMobile } from "@theme-hope/composables/index";
import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import type { VNode } from "vue";
import type { ThemePageFrontmatter } from "../../shared/index.js";

declare const ENABLE_BLOG: boolean;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",

  setup() {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const page = usePageData();
    const frontmatter = usePageFrontmatter<ThemePageFrontmatter>();
    const isMobile = useMobile();

    const sidebarDisplay = computed(
      () =>
        themeLocale.value.blog.sidebarDisplay ||
        themeData.value.blog.sidebarDisplay ||
        "mobile"
    );

    return (): VNode[] => [
      h(SkipLink),
      h(
        CommonWrapper,
        {},
        {
          default: () =>
            frontmatter.value.home
              ? h(HomePage)
              : h(FadeSlideY, () => h(NormalPage, { key: page.value.path })),
          ...(ENABLE_BLOG && sidebarDisplay.value !== "none"
            ? { navScreenBottom: () => h(resolveComponent("BloggerInfo")) }
            : {}),
          ...(ENABLE_BLOG &&
          !isMobile.value &&
          sidebarDisplay.value === "always"
            ? { sidebar: () => h(resolveComponent("BloggerInfo")) }
            : {}),
        }
      ),
    ];
  },
});
