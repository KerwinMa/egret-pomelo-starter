class MainLoadingUI extends eui.Component {
    private loading_bar: eui.Image;
    private loading_percent: eui.Label;
    private loading_text: eui.Label;
    private w: number = 0;
    private h: number = 0;

    public constructor(){
        super();
        this.skinName = "resource/ui/loading/Mainloading.exml";
    }

    public childrenCreated() {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
    }

    public setProgress (current:number, total:number):void {
        var rate: number = Math.round((current / total) * 100);
        this.loading_percent.text = rate + "%";
        this.loading_bar.width = 751.88 * (current / total);
        egret.log(total);
        if (total === 1) {
            this.loading_text.text = "加载完成,正在进入游戏";
        }
    }
}