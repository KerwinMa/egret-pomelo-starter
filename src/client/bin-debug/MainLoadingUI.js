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
var MainLoadingUI = (function (_super) {
    __extends(MainLoadingUI, _super);
    function MainLoadingUI() {
        var _this = _super.call(this) || this;
        _this.w = 0;
        _this.h = 0;
        _this.skinName = "resource/ui/loading/Mainloading.exml";
        return _this;
    }
    MainLoadingUI.prototype.childrenCreated = function () {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
    };
    MainLoadingUI.prototype.setProgress = function (current, total) {
        var rate = Math.round((current / total) * 100);
        this.loading_percent.text = rate + "%";
        this.loading_bar.width = 751.88 * (current / total);
        egret.log(total);
        if (total === 1) {
            this.loading_text.text = "加载完成,正在进入游戏";
        }
    };
    return MainLoadingUI;
}(eui.Component));
__reflect(MainLoadingUI.prototype, "MainLoadingUI");
//# sourceMappingURL=MainLoadingUI.js.map