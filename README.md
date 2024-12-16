# bop.js

`bop` is tiny no build wrapper library for creating web components.

## Quick Start

### cdn

```js
import { registerElement } from "https://cdn.jsdelivr.net/gh/dfirebaugh/bop@main/src/bop.js";
```

### example

Here’s an example of using `bop` to create and use a custom web component:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example</title>
  </head>
  <body>
    <example-element name="bop" />
    <script type="module">
      import { registerElement } from "https://cdn.jsdelivr.net/gh/dfirebaugh/bop@main/src/bop.js";

      function ExampleElement(ctx) {
        const { name } = ctx.attributes;
        return () => `<h1>Hello, ${name}!</h1>`;
      }

      registerElement(ExampleElement);
    </script>
  </body>
</html>
```

More examples: [bop.js demos](https://dfirebaugh.github.io/bop/)

---

## What is bop?

`bop` is a lightweight wrapper around custom HTML elements. It simplifies creating reusable web components. Familiarity with custom elements is helpful: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).

---

## How it Works

### Create an Element

Define a function that takes a `context` (`ctx`) object. This object gives you access to:
- `ctx.attributes`: Element attributes as an object.
- `ctx.renderChildren()`: Render child elements passed in HTML.
- Lifecycle hooks: `onConnected`, `onDisconnected`, etc.

Your function must return a function that generates HTML as a string. The resulting HTML is assigned to the element’s `innerHTML`.

```javascript
function ExampleElement(ctx) {
  const { title } = ctx.attributes;

  return () => `
    <h1>Hello, ${title || "world"}!</h1>
    ${ctx.renderChildren()}
  `;
}

registerElement(ExampleElement);
```

---

### Lifecycle

Respond to element lifecycle events with callbacks:

```javascript
function AlertMessage(ctx) {
  const { message = "Default alert!" } = ctx.attributes;

  ctx.onAttributeChanged((name, oldValue, newValue) => {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    ctx.update(); // Refresh HTML
  });

  return () => `<div>${message}</div>`;
}

registerElement(AlertMessage);
```

---

### Light DOM vs Shadow DOM

By default, `bop` does **not** use the Shadow DOM, so styles cascade naturally. If you need encapsulated styles, you’ll need to implement the Shadow DOM manually.

---

### Slots (Light DOM)

Since `bop` uses the light DOM, the native `slot` mechanism won’t work. Instead, use `ctx.renderChildren()` to insert child content.

```javascript
function CustomContainer(ctx) {
  return () => `<div>${ctx.renderChildren()}</div>`;
}

registerElement(CustomContainer);
```

---

### CSS

There’s no CSS encapsulation by default. Apply styles directly in your global CSS or inline.

---

## Passing Dependencies

You can inject dependencies using the `registerElement` function:

```javascript
const NameService = {
  getName: () => "Jerry",
};

function ExampleElement(ctx) {
  const { NameService } = ctx;
  return () => `<h1>Hello, ${NameService.getName()}!</h1>`;
}

registerElement(ExampleElement, { NameService });
```

---

## Casing / Element Names
The standard does have a concept of [valid custom html element names](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#valid_custom_element_names)

This is handled with some auto-magic.  Bop expects element names (i.e. the name of your function) to be [PascalCase](https://wiki.c2.com/?PascalCase) it will convert it to [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case).  This should result in a valid custom html name.


e.g.
When you call `registerElement(ExampleElement)` it will register the element with the name of `example-element`.
which you can reference in html as:
```html
<example-element />
<!--or-->
<example-element></example-element>
```

