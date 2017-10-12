module game {
    export class HallUserInfo extends eui.Component {
        constructor () {
            super();
            this.skinName = "resource/ui/hall/HallUserInfo.exml";
        }

        public childrenCreated () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openUserPanel, this);
        }

        private openUserPanel () {
            game.AppFacade.getInstance().sendNotification(HallPanelNotify.OPEN_USERINFO);
        }
    }
}