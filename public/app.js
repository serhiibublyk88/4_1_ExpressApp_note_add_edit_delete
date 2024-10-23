document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const currentNote = event.target.dataset.title;
    const id = event.target.dataset.id;

    const editedNote = prompt("Edit Note:", currentNote);

    if (editedNote) {
      edit(id, editedNote).then(() => {
        event.target.closest("li").childNodes[0].textContent = editedNote;
      });
    }
  }
});

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
  });
}
