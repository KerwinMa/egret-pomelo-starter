module game {

    export class LoginUI extends eui.Component {
        private btn_wechat: eui.Button;
        private btn_qq: eui.Button;

        public constructor () {
            super();
            this.skinName = "resource/ui/login/LoginUI.exml";
        }

        protected childrenCreated () {
            this.x = 700;
            this.y = 200;
            this.btn_wechat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWechatTap, this);
            this.btn_qq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQQtap, this);
        }

        private onWechatTap () {
            // game.AppFacade.getInstance().sendNotification(LoginNotify.TAP_WECHAT);
            game.AppFacade.getInstance().sendNotification(LoginNotify.CLOSE_LOGINUI);
            game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_LOGIN);
            game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_HALL);
            game.AppFacade.getInstance().sendNotification(HallNotify.OPEN_HALLUI);
        }

        private onQQtap () {
            // game.AppFacade.getInstance().sendNotification(LoginNotify.TAP_QQ);
            game.AppFacade.getInstance().sendNotification(LoginNotify.CLOSE_LOGINUI);
            game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_LOGIN);
            game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_HALL);
            game.AppFacade.getInstance().sendNotification(HallNotify.OPEN_HALLUI);
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }
    }
}