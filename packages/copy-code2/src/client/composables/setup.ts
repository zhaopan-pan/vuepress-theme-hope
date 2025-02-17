/**
 * Forked and edited from https://github.com/vxhly/vuepress-plugin-one-click-copy/blob/master/bin/clientRootMixin.js
 *
 * MIT License
 *
 * Copyright (c) 2019 vxhly <pengchengou@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * © 2019 GitHub, Inc.
 */

import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Message, useLocaleConfig } from "vuepress-shared/client";

import {
  copyCodeDelay,
  copyCodeDuration,
  copyCodeLocales,
  copyCodePure,
  copyCodeSelector,
  copyCodeShowInMobile,
} from "../define.js";
import { CHECK_ICON, copyToClipboard } from "../utils/index.js";

import "vuepress-shared/client/styles/message.scss";

const isMobile = (): boolean =>
  navigator
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator.userAgent
      )
    : false;

const timeoutIdMap: Map<HTMLElement, NodeJS.Timeout> = new Map();

export const setupCopyCode = (): void => {
  const route = useRoute();
  const locale = useLocaleConfig(copyCodeLocales);

  let message: Message;

  const insertCopyButton = (codeBlockElement: HTMLElement): void => {
    if (!codeBlockElement.hasAttribute("copy-code-registered")) {
      const copyElement = document.createElement("button");

      copyElement.classList.add("copy-code-button");
      copyElement.innerHTML = '<div class="copy-icon" />';
      copyElement.setAttribute("aria-label", locale.value.copy);
      copyElement.setAttribute("data-copied", locale.value.copied);

      if (copyCodePure) copyElement.classList.add("pure");
      else copyElement.setAttribute("data-balloon-pos", "left");

      if (codeBlockElement.parentElement)
        codeBlockElement.parentElement.insertBefore(
          copyElement,
          codeBlockElement
        );
      codeBlockElement.setAttribute("copy-code-registered", "");
    }
  };

  const generateCopyButton = (): void => {
    setTimeout(() => {
      if (typeof copyCodeSelector === "string")
        document
          .querySelectorAll<HTMLElement>(copyCodeSelector)
          .forEach(insertCopyButton);
      else if (Array.isArray(copyCodeSelector))
        copyCodeSelector.forEach((item) => {
          document
            .querySelectorAll<HTMLElement>(item)
            .forEach(insertCopyButton);
        });
    }, copyCodeDelay || 500);
  };

  const copy = (
    codeContainer: HTMLDivElement,
    codeContent: HTMLPreElement,
    button: HTMLButtonElement
  ): void => {
    let { innerText: text = "" } = codeContent;

    if (
      // is shell
      /language-(shellscript|shell|bash|sh|zsh)/.test(
        codeContainer.classList.toString()
      )
    )
      text = text.replace(/^ *(\$|>) /gm, "");

    void copyToClipboard(text).then(() => {
      button.classList.add("copied");
      clearTimeout(timeoutIdMap.get(button));

      const timeoutId = setTimeout(() => {
        button.classList.remove("copied");
        button.blur();
        timeoutIdMap.delete(button);
      }, 2000);

      timeoutIdMap.set(button, timeoutId);

      if (!copyCodePure)
        message.pop(
          `${CHECK_ICON}<span>${locale.value.hint} 🎉</span>`,
          copyCodeDuration
        );
    });
  };

  onMounted(() => {
    message = new Message();

    if (!isMobile() || copyCodeShowInMobile) generateCopyButton();

    window.addEventListener("click", (event) => {
      const el = event.target as HTMLElement;

      if (el.matches('div[class*="language-"] > button.copy')) {
        const codeContainer = <HTMLDivElement>el.parentElement;
        const preBlock = <HTMLPreElement | null>el.nextElementSibling;

        if (preBlock) copy(codeContainer, preBlock, <HTMLButtonElement>el);
      } else if (el.matches('div[class*="language-"] div.copy-icon')) {
        const buttonElement = <HTMLButtonElement>el.parentElement;
        const codeContainer = <HTMLDivElement>buttonElement.parentElement;
        const preBlock = <HTMLPreElement | null>(
          buttonElement.nextElementSibling
        );

        if (preBlock) copy(codeContainer, preBlock, buttonElement);
      }
    });
  });

  watch(
    () => route.path,
    () => {
      if (!isMobile() || copyCodeShowInMobile) generateCopyButton();
    }
  );
};
