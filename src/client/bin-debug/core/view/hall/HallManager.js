var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var HallManager = (function (_super) {
        __extends(HallManager, _super);
        function HallManager() {
            return _super.call(this) || this;
        }
        HallManager.prototype.register = function () {
            this.facade.registerCommand(HallNotify.OPEN_HALLUI, HallManager);
            this.facade.registerCommand(HallNotify.CLOSE_HALLUI, HallManager);
            this.facade.registerCommand(HallNotify.ENTER_HOME_STATE, HallManager);
            this.facade.registerCommand(HallNotify.ENTER_SHOP_GOLD_STATE, HallManager);
        };
        HallManager.prototype.execute = function (notification) {
            var data = notification.getBody(); //携带数据
            var panelCon = GameLayerManager.gameLayer().mainLayer;
            var HallUI = game.HallManager.HallUI;
            switch (notification.getName()) {
                case HallNotify.OPEN_HALLUI:
                    if (HallUI == null) {
                        HallUI = new game.HallUI();
                        panelCon.addChild(HallUI);
                        game.HallManager.HallUI = HallUI;
                    }
                    break;
                case HallNotify.CLOSE_HALLUI:
                    if (HallUI != null) {
                        panelCon.removeChild(HallUI);
                        HallUI = null;
                        game.HallManager.HallUI = null;
                    }
                    break;
                case HallNotify.ENTER_SHOP_GOLD_STATE:
                    if (!game.SceneManager.hallScene || !game.HallManager.HallUI)
                        return;
                    game.SceneManager.hallScene.currentState = 'shop';
                    game.HallManager.HallUI.currentState = 'shopAddGold';
                    break;
                case HallNotify.ENTER_HOME_STATE:
                    if (!game.SceneManager.hallScene || !game.HallManager.HallUI)
                        return;
                    game.SceneManager.hallScene.currentState = 'home';
                    game.HallManager.HallUI.currentState = 'home';
                    break;
            }
        };
        HallManager.NAME = "HallManager";
        return HallManager;
    }(puremvc.SimpleCommand));
    game.HallManager = HallManager;
    __reflect(HallManager.prototype, "game.HallManager", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=HallManager.js.map