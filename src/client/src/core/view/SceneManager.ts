/**
  * 场景管理类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 所有的弹窗都需要在register注册事件
  * 在execute添加消息处理面板打开关闭事件
  */
module game {

    export class SceneManager extends puremvc.SimpleCommand implements puremvc.ICommand {
        public static loginScene: Login;
        public static hallScene: Hall;

        public constructor() {
            super();
        }

        public static NAME: string = "SceneManager";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand(SceneNotify.OPEN_LOGIN, SceneManager); // 打开login场景
            this.facade.registerCommand(SceneNotify.CLOSE_LOGIN, SceneManager); // 关闭login场景
            this.facade.registerCommand(SceneNotify.OPEN_HALL, SceneManager); // 打开大厅场景
            this.facade.registerCommand(SceneNotify.CLOSE_HALL, SceneManager); // 关闭大厅场景
        }

        public execute(notification: puremvc.INotification): void {
            let data: any = notification.getBody();//携带数据
            let panelCon = GameLayerManager.gameLayer().sceneLayer;

            // 场景实例
            let loginScene = game.SceneManager.loginScene;
            let hallScene = game.SceneManager.hallScene;

            switch (notification.getName()) {
                case SceneNotify.OPEN_LOGIN:
                    if (loginScene == null) {
                        loginScene = new Login();
                        panelCon.addChild(loginScene);
                        game.SceneManager.loginScene = loginScene;
                    }
                    break;
                case SceneNotify.CLOSE_LOGIN:
                    if (loginScene != null) {
                        panelCon.removeChild(loginScene);
                        loginScene = null;
                        game.SceneManager.loginScene = null;
                    }
                    break;
                case SceneNotify.OPEN_HALL:
                    if (hallScene == null) {
                        hallScene = new Hall();
                        panelCon.addChild(hallScene);
                        game.SceneManager.hallScene = hallScene;
                    }
                    break;
                case SceneNotify.CLOSE_HALL:
                    if (hallScene != null) {
                        panelCon.removeChild(hallScene);
                        hallScene = null;
                        game.SceneManager.hallScene = null;
                    }
                    break;
            }
        }
    }
}
