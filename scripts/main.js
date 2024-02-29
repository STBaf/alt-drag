const MODULE_KEY = "alt-drag";
const IS_KEY_HELD_OPT = "isKeyHeld";

const active = () => game.settings.get(MODULE_KEY, IS_KEY_HELD_OPT);
const setActive = (value) =>
  game.settings.set(MODULE_KEY, IS_KEY_HELD_OPT, value);

function registerSettings() {
  game.settings.register(MODULE_KEY, IS_KEY_HELD_OPT, {
    name: "Prevent Token Animation",
    hint: "Prevent animating token drag",
    scope: "client",
    config: false,
    type: Boolean,
    default: false,
  });
}

function registerKeybindings() {
  game.keybindings.register(MODULE_KEY, "moveWithoutAnimation", {
    name: game.i18n.localize("alt-drag.keybindings.moveWithoutAnimation.name"),
    hint: game.i18n.localize("alt-drag.keybindings.moveWithoutAnimation.hint"),
    onDown: handleMoveWithoutAnimation,
    onUp: handleMoveWithoutAnimation,
    editable: [
      {
        key: "AltLeft",
      },
    ],
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
  });
}

function handleMoveWithoutAnimation(event) {
  const isKeyPressed = !event.up;
  const isGM = game.user.isGM;
  setActive(isKeyPressed && isGM);
}

Hooks.once("init", function () {
  registerSettings();
  registerKeybindings();
});

Hooks.on("preUpdateToken", function (_document, _changes, options, _userId) {
  if (active()) {
    options.animate = false;
  }
});
