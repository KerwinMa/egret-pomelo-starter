module game {
    export class HallUserBar extends eui.Component {
        private back_to_home_btn: eui.Button;

        constructor () {
            super();
            this.skinName = "resource/ui/hall/HallUserBar.exml";
        }

        public childrenCreated () {
            this.back_to_home_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToHome, this);
        }

        public backToHome () {
            game.AppFacade.getInstance().sendNotification(HallNotify.ENTER_HOME_STATE);
        }
    } 
}