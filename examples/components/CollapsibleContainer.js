export default function CollapsibleContainer(ctx) {
  let isCollapsed = true;

  ctx.setOnConnectedCallback(function () {
    ctx.update();

    ctx.dom.addEventListener("click", (event) => {
      if (event.target.id === "toggle-collapse") {
        isCollapsed = !isCollapsed;
        ctx.update();
      }
    });
  });

  ctx.setOnDisconnectedCallback(() => {
    console.log("CollapsibleContainer removed from the DOM");
  });

  return () => {
    return `
      <div class="box">
        <button id="toggle-collapse" class="button is-primary">
          ${isCollapsed ? "Show" : "Hide"} Code
        </button>
        <div class="content" style="display: ${isCollapsed ? "none" : "block"};">
          ${ctx.renderChildren()}
        </div>
      </div>
    `;
  };
}
