export default function ProgressBar(ctx) {
  let progress = 0;

  ctx.onConnected(function () {
    ctx.update();

    ctx.dom.addEventListener("click", (event) => {
      if (event.target.id === "increase-progress") {
        progress = Math.min(progress + 10, 100);
        ctx.update();
      }
    });
  });

  return () => `
        <h1 class="title is-4">Progress Bar</h1>
        <progress class="progress is-primary" value="${progress}" max="100">${progress}%</progress>
        <button id="increase-progress" class="button is-info">Increase Progress</button>
    `;
}
