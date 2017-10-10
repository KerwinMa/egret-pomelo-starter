var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HallPanelNotify = (function () {
    function HallPanelNotify() {
    }
    // 打开角色面板
    HallPanelNotify.OPEN_USERINFO = "HallPanelNotify_OPEN_USERINFO";
    // 关闭角色面板
    HallPanelNotify.CLOSE_USERINFO = "HallPanelNotify_CLOSE_USERINFO";
    // 打开购买金币面板
    HallPanelNotify.OPEN_SHOPADDGOLD = "HallPanelNotify_OPEN_SHOPADDGOLD";
    // 关闭购买金币面板
    HallPanelNotify.CLOSE_SHOPADDGOLD = "HallPanelNotify_CLOSE_SHOPADDGOLD";
    return HallPanelNotify;
}());
__reflect(HallPanelNotify.prototype, "HallPanelNotify");
//# sourceMappingURL=HallPanelNotify.js.map