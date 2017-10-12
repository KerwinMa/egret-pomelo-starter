module game {
    export class HallUserInfoMediator extends BaseMediator {
        public static NAME: string = "HallUserInfoMediator";
        // 角色面板实例化
        private hallUserInfoPanel: HallUserInfoPanel = new HallUserInfoPanel();

        public constructor(viewComponent: any = null) {
            super(HallUserInfoMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                HallPanelNotify.OPEN_USERINFO,
                HallPanelNotify.CLOSE_USERINFO
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case HallPanelNotify.OPEN_USERINFO:
                    //显示角色面板
                    this.showUI(this.hallUserInfoPanel, true, 0, 0, 1);
                    break;
                case HallPanelNotify.CLOSE_USERINFO:
                    this.closePanel(1);
                    break;
            }
        }

        public initUI(): void {

        }

        public initData(): void {

        }
    }
}