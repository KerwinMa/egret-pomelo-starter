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
var hall;
(function (hall) {
    var HallShopAddGold = (function (_super) {
        __extends(HallShopAddGold, _super);
        function HallShopAddGold() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/hall/HallShopAddGold.exml";
            return _this;
        }
        return HallShopAddGold;
    }(eui.Component));
    hall.HallShopAddGold = HallShopAddGold;
    __reflect(HallShopAddGold.prototype, "hall.HallShopAddGold");
})(hall || (hall = {}));
//# sourceMappingURL=HallShopAddGold.js.map