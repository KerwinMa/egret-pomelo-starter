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
    var HallUserBar = (function (_super) {
        __extends(HallUserBar, _super);
        function HallUserBar() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/hall/HallUserBar.exml";
            return _this;
        }
        HallUserBar.prototype.childrenCreated = function () {
            this.back_to_home_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToHome, this);
        };
        HallUserBar.prototype.backToHome = function () {
            game.AppFacade.getInstance().sendNotification(HallNotify.ENTER_HOME_STATE);
        };
        return HallUserBar;
    }(eui.Component));
    game.HallUserBar = HallUserBar;
    __reflect(HallUserBar.prototype, "game.HallUserBar");
})(game || (game = {}));
//# sourceMappingURL=HallUserBar.js.map