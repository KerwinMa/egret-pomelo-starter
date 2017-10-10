module game {
    export class HallUserInfoPanel extends eui.Component {
        private close_panel_btn: eui.Button

        public constructor () {
            super();
            this.skinName = "resource/ui/panel/hall/HallUserInfo.exml";
            this.addEventListener(eui.UIEvent.COMPLETE , this.createCompleteEvent, this);
        }

        public childrenCreated() {
            this.close_panel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        }

        public createCompleteEvent(event:eui.UIEvent):void{
            this.removeEventListener(eui.UIEvent.COMPLETE , this.createCompleteEvent, this);
        }

        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
        }

        // 关闭个人中心
        private closePanel () {
            game.AppFacade.getInstance().sendNotification(HallPanelNotify.CLOSE_USERINFO);
        }
    }
}