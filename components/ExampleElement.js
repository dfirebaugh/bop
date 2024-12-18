export default function ExampleElement(ctx) {
  const { title } = ctx.attributes;
  const { NameService } = ctx;

  return () => `
        <h1 class="title is-3">Hello, world, ${ctx.attributes.title} ${NameService.getName()}</h1>
        ${ctx.renderChildren()}
    `;
}
