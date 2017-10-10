/**
  * login 场景管理类
  * by pengju
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 所有的弹窗都需要在register注册事件
  * 在execute添加消息处理面板打开关闭事件
  */
module game {

    export class LoginManager extends puremvc.SimpleCommand implements puremvc.ICommand {
        public static LoginUI: game.LoginUI;

        public constructor() {
            super();
        }

        public static NAME: string = "LoginManager";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand(LoginNotify.OPEN_LOGINUI, LoginManager);
            this.facade.registerCommand(LoginNotify.CLOSE_LOGINUI, LoginManager);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var panelCon = GameLayerManager.gameLayer().mainLayer;
            var LoginUI = game.LoginManager.LoginUI;
            switch (notification.getName()) {
                case LoginNotify.OPEN_LOGINUI:
                    if (LoginUI == null) {
                        LoginUI = new game.LoginUI();
                        panelCon.addChild(LoginUI);
                        game.LoginManager.LoginUI = LoginUI;
                    }
                    break;
                case LoginNotify.CLOSE_LOGINUI:
                    if (LoginUI != null) {
                        panelCon.removeChild(LoginUI);
                        LoginUI = null;
                        game.LoginManager.LoginUI = null;
                    }
                    break;
            }
        }
    }
}
