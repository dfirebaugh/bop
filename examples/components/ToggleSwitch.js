export default function ToggleSwitch(ctx) {
  let isChecked = false;

  ctx.setOnConnectedCallback(function () {
    ctx.update();

    ctx.dom.addEventListener("click", (event) => {
      if (event.target.id === "toggle-switch") {
        isChecked = !isChecked;
        ctx.update();
      }
    });
  });

  return () => {
    return `
        <label class="checkbox">
          <input id="toggle-switch" type="checkbox" ${isChecked ? "checked" : ""}>
          Toggle Switch
        </label>
        <p>${isChecked ? "Switch is ON" : "Switch is OFF"}</p>
    `;
  };
}
