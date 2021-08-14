# 7GUIs Programming Benchmark Challenge

The <a target="_blank" rel="noopenner noreferrer" href="https://eugenkiss.github.io/7guis/">7GUIs (Graphical User Interfaces) programming benchmark</a> is a useful way to sharpen and showcase your frontend development skills.

I'm choosing to work directly with HTML, CSS, and <a target="_blank" rel="noopenner noreferrer" href="http://vanilla-js.com/">Vanilla JavaScript</a>. But there are no restrictions on using frameworks / libraries to complete the 7GUIs.

## Development
To get this site running on your machine...
- Clone this repository (or download and unzip the folder) and change into the desination directory.
- Start a server pointing at the `site` folder (continue reading if you have NodeJS on your system).
- Run following commands from the command line interface:
  - `pnpm i`
  > *I use `pnpm` but you can replace this command with `npm i` or `yarn` depending on which is your preferred package manager.*
  - `npm start` OR `yarn start`
  - Once the server is running, your browser should open to the localhost port the site is being served from. Any changes you make to files in the `site` folder should be picked up by `browser-sync` and it will "hot reload" (re-render with the changes).
