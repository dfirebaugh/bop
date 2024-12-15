export default function TodoList(ctx) {
  let todos = [];

  ctx.onConnected(function () {
    ctx.update();

    ctx.dom.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = event.target.querySelector("#new-todo");
      if (input.value.trim()) {
        todos.push(input.value.trim());
        input.value = "";
        ctx.update();
      }
    });

    ctx.dom.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-todo")) {
        const index = event.target.dataset.index;
        todos.splice(index, 1);
        ctx.update();
      }
    });
  });

  return () => `
        <h1 class="title is-4">Todo List</h1>
        <form>
          <div class="field">
            <div class="control">
              <input id="new-todo" class="input" type="text" placeholder="New todo">
            </div>
          </div>
          <button class="button is-primary" type="submit">Add Todo</button>
        </form>
        <ul>
          ${todos
            .map(
              (todo, index) => `
            <li>
              ${todo} <button class="delete-todo button is-small is-danger" data-index="${index}">Delete</button>
            </li>
          `,
            )
            .join("")}
        </ul>
    `;
}
