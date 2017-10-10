var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
  * 场景消息
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var SceneNotify = (function () {
    function SceneNotify() {
    }
    // 打开login场景
    SceneNotify.OPEN_LOGIN = "SceneNotify_OPEN_LOGIN";
    // 关闭login场景
    SceneNotify.CLOSE_LOGIN = "SceneNotify_CLOSE_LOGIN";
    // 打开大厅场景
    SceneNotify.OPEN_HALL = "SceneNotify_OPEN_HALL";
    // 关闭大厅场景
    SceneNotify.CLOSE_HALL = "SceneNotify_CLOSE_HALL";
    return SceneNotify;
}());
__reflect(SceneNotify.prototype, "SceneNotify");
//# sourceMappingURL=SceneNotify.js.map