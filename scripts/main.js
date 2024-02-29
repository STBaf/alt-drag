const MODULE_KEY = "alt-drag";
const OPTION_KEY = "preventAnimation";

const state = {
  active: false,
};

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
    precedence: -1,
  });
}

function handleMoveWithoutAnimation(event) {
  const isKeyPressed = !event.up;
  const isGM = game.user.isGM;
  state.active = isKeyPressed && isGM;
}

Hooks.once("init", function () {
  registerKeybindings();
});

Hooks.on("preUpdateToken", function (_document, changes, options, userId) {
  const moveKeys = ["x", "y"];

  const modActive = state.active;
  const isMove = moveKeys.every((key) => changes.hasOwnProperty(key));
  const isAlreadySet = options.hasOwnProperty(OPTION_KEY);

  if (modActive && isMove && !isAlreadySet) {
    options[OPTION_KEY] = true;
  }
});

Hooks.on("updateToken", function (document, change, options, userId) {
  if (OPTION_KEY in options && options[OPTION_KEY] === true) {
    const token = document._object;

    if (token && token._animation) {
      const animation = CanvasAnimation.getAnimation(token.animationName);
      animation.time = animation.duration;
    }
  }
});
