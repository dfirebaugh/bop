export default function ClickCounter(ctx) {
  let clickCount = 0;

  ctx.setOnConnectedCallback(function () {
    ctx.update();

    ctx.dom.addEventListener("click", (event) => {
      if (event.target.id === "increment-btn") {
        clickCount++;
        ctx.update();
      }
    });
  });

  ctx.setOnDisconnectedCallback(() => {
    console.log("ClickCounter removed from the DOM");
  });

  return () => {
    return `
        <h1 class="title is-4">Click Counter</h1>
        <p id="click-count">You clicked the button ${clickCount} times.</p>
        <button id="increment-btn" class="button is-info">Click Me!</button>
    `;
  };
}
