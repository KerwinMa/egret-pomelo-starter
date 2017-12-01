module game {
    export class HallManager extends puremvc.SimpleCommand implements puremvc.ICommand {
        public static HallUI: HallUI;

        public constructor () {
            super();
        }

        public static NAME: string = "HallManager";

        public register(): void {
            this.facade.registerCommand(HallNotify.OPEN_HALLUI, HallManager);
            this.facade.registerCommand(HallNotify.CLOSE_HALLUI, HallManager);
            this.facade.registerCommand(HallNotify.ENTER_HOME_STATE, HallManager);
            this.facade.registerCommand(HallNotify.ENTER_SHOP_GOLD_STATE, HallManager);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            var panelCon = GameLayerManager.gameLayer().mainLayer;
            var HallUI = game.HallManager.HallUI;

            switch (notification.getName()) {
                case HallNotify.OPEN_HALLUI:
                    if (HallUI == null) {
                        HallUI = new game.HallUI();
                        panelCon.addChild(HallUI);
                        game.HallManager.HallUI = HallUI;
                    }
                    break;
                case HallNotify.CLOSE_HALLUI:
                    if (HallUI != null) {
                        panelCon.removeChild(HallUI);
                        HallUI = null;
                        game.HallManager.HallUI = null;
                    }
                    break;
                case HallNotify.ENTER_SHOP_GOLD_STATE:
                    if (!game.SceneManager.hallScene || !game.HallManager.HallUI) return
                    game.SceneManager.hallScene.currentState = 'shop';
                    game.HallManager.HallUI.currentState = 'shopAddGold';
                    break;
                case HallNotify.ENTER_HOME_STATE:
                    if (!game.SceneManager.hallScene || !game.HallManager.HallUI) return
                    game.SceneManager.hallScene.currentState = 'home';
                    game.HallManager.HallUI.currentState = 'home';
                    break;
            }
        }
    }
}