---
title: AudioPlayer
---

Embed audios in Markdown files.

<!-- more -->

## Demo

An audio player:

<AudioPlayer :src="$withBase('/sample.mp3')" />

```md
<AudioPlayer :src="$withBase('/sample.mp3')" />
```

An audio player with poster and title:

<AudioPlayer
  :src="$withBase('/sample.mp3')"
  title="A Sample Audio"
  poster="/logo.svg"
/>

```md
<AudioPlayer
  :src="$withBase('/sample.mp3')"
  title="A Sample Audio"
  poster="/logo.svg"
/>
```

## Props

### src

- Type: `string`
- Required: Yes

Audio source link

### width

- Type: `string | number`
- Default: `100%`

Audio component width.

### type

- Type: `string`
- Required: No

Audio type.

::: note

If your server cannot return a correct mime type for your audio files, you should specific it. (e.g.: `audio/mp3`)

:::

### poster

- Type: `string`
- Required: No

Audio poster
