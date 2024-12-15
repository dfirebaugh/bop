import ClickCounter from "./components/ClickCounter.js";
import ExampleElement from "./components/ExampleElement.js";
import ButtonExample from "./components/ButtonExample.js";
import ToggleSwitch from "./components/ToggleSwitch.js";
import UserCard from "./components/UserCard.js";
import ProgressBar from "./components/ProgressBar.js";
import AlertMessage from "./components/AlertMessage.js";
import TodoList from "./components/TodoList.js";
import CollapsibleContainer from "./components/CollapsibleContainer.js";
import CodeViewer from "./components/CodeViewer.js";

import { registerElement } from "./src/bop.js";

const NameService = {
  getName: () => "jerry",
};

registerElement(ExampleElement, {
  NameService,
});
registerElement(ClickCounter);
registerElement(ButtonExample);
registerElement(ToggleSwitch);
registerElement(UserCard);
registerElement(ProgressBar);
registerElement(AlertMessage);
registerElement(TodoList);
registerElement(CollapsibleContainer);
registerElement(CodeViewer);

