---
title: PDF
---

PDF viewer component.

You can use this component to embed a PDF viewer.

<!-- more -->

## Demo

Default PDF viewer:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

PDF viewer starting with page 2 and without toolbar:

<PDF url="/sample.pdf" page="2" no-toolbar />

```md
<PDF url="/sample.pdf" page="2" no-toolbar />
```

## Props

### url

- Type: `string`
- Required: Yes

PDF document link, relative path is NOT supported.

### width

- Type: `string | number`
- Default: `100%`

PDF viewer width.

### height

- Type: `string | number`
- Required: No

PDF viewer height

### radio

- Type: `number`
- Default: `16 / 9`

PDF viewer radio, ONLY valid when `height` not set.

### page

- Type: `number`
- Default: `1`

Initial page of pdf document.

::: warning

This prop only works on Chromium-based browsers.

:::

### noToolbar

- Type: `boolean`
- Default: `false`

Whether to hide toolbar.

::: warning

This prop only works on Chromium-based browsers.

:::

### zoom

- Type: `number`
- Default: `100`

Initial zoom level of pdf document.

::: warning

This prop only works on Chromium-based browsers.

:::
