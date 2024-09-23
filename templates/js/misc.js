const {shell} = require('electron');


async function openExternal(link) {
  shell.openExternal(link)
}