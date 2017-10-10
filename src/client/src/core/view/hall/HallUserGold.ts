module game {
    export class HallUserGold extends eui.Component {
        public add_gold_btn: eui.Button;

        constructor () {
            super ();
            this.skinName = "resource/ui/hall/HallUserGold.exml";
        }

        childrenCreated () {
            this.add_gold_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAddGoldPanel, this);
        }

        openAddGoldPanel() {
            game.AppFacade.getInstance().sendNotification(HallNotify.ENTER_SHOP_GOLD_STATE);
        }
    }
}