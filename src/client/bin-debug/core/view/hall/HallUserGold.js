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
    var HallUserGold = (function (_super) {
        __extends(HallUserGold, _super);
        function HallUserGold() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/hall/HallUserGold.exml";
            return _this;
        }
        HallUserGold.prototype.childrenCreated = function () {
            this.add_gold_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAddGoldPanel, this);
        };
        HallUserGold.prototype.openAddGoldPanel = function () {
            game.AppFacade.getInstance().sendNotification(HallNotify.ENTER_SHOP_GOLD_STATE);
        };
        return HallUserGold;
    }(eui.Component));
    game.HallUserGold = HallUserGold;
    __reflect(HallUserGold.prototype, "game.HallUserGold");
})(game || (game = {}));
//# sourceMappingURL=HallUserGold.js.map