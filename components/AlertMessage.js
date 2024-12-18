export default function AlertMessage(ctx) {
  const { message, type } = ctx.attributes;

  ctx.onAttributeChanged(function (name, oldValue, newValue) {
    console.log(
      `Attribute changed: ${name} from "${oldValue}" to "${newValue}"`,
    );
    ctx.attributes[name] = newValue;
    ctx.update();
  });

  return () => `
      <div class="notification is-${type || "info"}">
        <button class="delete"></button>
        ${message || "This is an alert message!"}
      </div>
    `;
}
