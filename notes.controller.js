const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here ist the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const filtered = notes.filter((note) => note.id !== id);

  await saveNotes(filtered);
  console.log(chalk.bgRed(`Note with id="${id}" was deleted!`));
}

async function editNote(id, newTitle) {
  const notes = await getNotes();

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex !== -1) {
    notes[noteIndex].title = newTitle;
    await saveNotes(notes);
    console.log(
      chalk.bgYellow(`Note with id="${id}" was edited to "${newTitle}"!`)
    );
  } else {
    console.log(chalk.bgRed(`Note with id="${id}" not found!`));
  }
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
