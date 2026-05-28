# Monocle-Bot

A Discord music bot built with **discord.js v13** and **discord-player v5** that plays music from **YouTube**, **SoundCloud**, and **Spotify**.

Created by [tyrone](https://github.com/tyrone-serdan)

---

## Features

- Play music via URL or search query from YouTube, SoundCloud, and Spotify
- Slash commands for everything
- Queue management with up to 5 visible queued songs
- Loop modes: Off, Queue, or Track
- Volume control (0–100%)
- Current track info display
- Automatic error handling and skip on crash

---

## Commands

| Command | Description |
|----------|-------------|
| `/play <song>` | Joins your voice channel and plays a song (URL or search query) |
| `/skip` | Skips the current song |
| `/queue` | Shows the current song queue |
| `/loop <option>` | Loops the track, queue, or turns looping off |
| `/reset` | Disconnects the bot and clears the queue |
| `/nowplaying` | Shows details of the currently playing song |
| `/volume <number>` | Sets the volume (0–100) |
| `/help [command]` | Lists all commands or shows usage for a specific command |
| `/info` | Shows information about the bot |
| `/knownissues` | Lists known bugs and issues |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- A [Discord Bot Application](https://discord.com/developers/applications) with a token
- FFmpeg (bundled via `ffmpeg-static`)

---

## Setup

1. Clone the repo:

```bash
git clone https://github.com/tyrone-serdan/Monocle-Bot.git
cd Monocle-Bot
````

2. Install dependencies:

```bash
npm install
```

3. Create `src/Data/Config.json` with your bot token:

```json
{
  "token": "YOUR_BOT_TOKEN_HERE"
}
```

4. (Optional) Enable debug mode for specific guilds by uncommenting `debugGuilds` in `index.js` and adding guild IDs.

5. Run the bot:

```bash
npm start
```

---

## Dependencies

* discord.js ([https://www.npmjs.com/package/discord.js](https://www.npmjs.com/package/discord.js)) ^13.1.0
* discord-player ([https://www.npmjs.com/package/discord-player](https://www.npmjs.com/package/discord-player)) ^5.1.0
* @discordjs/opus ([https://www.npmjs.com/package/@discordjs/opus](https://www.npmjs.com/package/@discordjs/opus)) ^0.5.3
* ffmpeg-static ([https://www.npmjs.com/package/ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static)) ^4.4.0

---

## Project Structure

```
Monocle-Bot/
├── index.js                  # Entry point
├── package.json
├── src/
│   ├── Commands/
│   │   ├── info/
│   │   │   ├── info.js       # Bot info command
│   │   │   └── knownIssues.js
│   │   └── music/
│   │       ├── Play.js       # /play
│   │       ├── Skip.js       # /skip
│   │       ├── Queue.js      # /queue
│   │       ├── Loop.js       # /loop
│   │       ├── Reset.js      # /reset
│   │       ├── nowPlaying.js # /nowplaying
│   │       ├── setVolume.js  # /volume
│   │       └── Help.js       # /help
│   ├── Structures/
│   │   ├── Client.js         # Custom Discord.Client
│   │   └── Command.js        # Command class
│   └── Data/
│       └── Config.json       # Bot token (gitignored)
└── references/
    ├── template.js           # Command template
    └── reference.js          # Command reference example
```

---

## Known Issues

* Bot may randomly crash mid-song
* ytdl-core can be buggy — some songs might not play

---

## License

ISC
