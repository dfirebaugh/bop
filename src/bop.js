function toKebabCase(name) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function registerElement(element, injections) {
  const tagName = toKebabCase(element.name);

  class X extends HTMLElement {
    constructor() {
      super();

      this.context = {
        attributes: {},
        lifecycles: {},
        onConnected(callback) {
          this.lifecycles.connectedCallback = callback;
        },
        onDisconnected(callback) {
          this.lifecycles.disconnectedCallback = callback;
        },
        onAttributeChanged(callback) {
          this.lifecycles.attributeChangedCallback = callback;
        },
        onAdopted(callback) {
          this.lifecycles.adoptedCallback = callback;
        },
        observedAttributes(attributes) {
          this.lifecycles.observedAttributes = attributes;
        },
        renderChildren() {
          return (
            this.children
              ?.map((child) =>
                child.nodeType === Node.ELEMENT_NODE
                  ? child.outerHTML
                  : escapeHtml(child.textContent),
              )
              .join("") || ""
          );
        },
      };

      const attributes = Array.from(this.attributes).reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {});
      this.context.attributes = attributes;
      this.context.dom = this;

      const originalChildren = Array.from(this.childNodes);
      this.context.children = originalChildren.map((child) =>
        child.cloneNode(true),
      );

      this.context.render = element(Object.assign(this.context, injections));

      this.context.update = () => {
        this.context.dom.innerHTML = this.context.render();
      };

      this.context.update();
    }

    static get observedAttributes() {
      return this.prototype.context?.lifecycles?.observedAttributes || [];
    }

    connectedCallback() {
      this.context.lifecycles?.connectedCallback?.call(this);
    }

    disconnectedCallback() {
      this.context.lifecycles?.disconnectedCallback?.call(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.context.lifecycles?.attributeChangedCallback?.call(
        this,
        name,
        oldValue,
        newValue,
      );
    }
  }

  customElements.define(tagName, X);
}
