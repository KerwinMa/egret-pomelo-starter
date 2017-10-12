module game {

    export class Hall extends eui.Component {

        public constructor() {
            super();
            this.skinName = "resource/ui/scene/HallSkin.exml";
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