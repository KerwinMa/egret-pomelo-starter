module game {

    export class Login extends eui.Component {

        public constructor() {
            super();
            this.skinName = "resource/ui/scene/LoginSkin.exml";
            this.addEventListener(eui.UIEvent.COMPLETE,this.createCompleteEvent,this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE,this.createCompleteEvent,this);
            
            GameLayerManager.gameLayer().sceneLayer.addChild(this);            
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }
    }
}