export default function ExampleElement(ctx) {
  const { title } = ctx.attributes;
  const { NameService } = ctx.injections;

  ctx.setOnConnectedCallback(function () {
    ctx.update();
  });

  ctx.setOnAttributeChangedCallback(function (name, oldValue, newValue) {
    console.log(
      `Attribute changed: ${name} from "${oldValue}" to "${newValue}"`,
    );
    ctx.attributes[name] = newValue;
    ctx.update();
  });

  return () => {
    return `
        <h1 class="title is-3">Hello, world, ${ctx.attributes.title} ${NameService.getName()}</h1>
        ${ctx.renderChildren()}
    `;
  };
}
