@RES.mapConfig("config.json",()=>"resource",path => {
    var ext = path.substr(path.lastIndexOf(".") + 1);
    var typeMap = {
        "jpg": "image",
        "png": "image",
        "webp": "image",
        "json": "json",
        "fnt": "font",
        "pvr": 'pvr',
        "mp3": "sound",
        "proto": "proto",
        "txt": "txt"
    }
    var type = typeMap[ext];
    if (type == "json") {
        if (path.indexOf("sheet") >= 0) {
            type = "sheet";
        } else if (path.indexOf("movieclip") >= 0) {
            type = "movieclip";
        };
    }
    return type;
})
class Main extends eui.UILayer {

    /**
     * 加载进度界面
     */
    private loadingView:MainLoadingUI;    

    protected createChildren(): void {
        super.createChildren();

        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);

        var theme = new eui.Theme("resource/default.thm.json", this.stage);

        RES.processor.map("proto", ProtoAnalyzer);
        RES.processor.map("txt", EnJsonAnalyzer);

        //游戏自定义容器添加到舞台上
        this.addChild(GameLayerManager.gameLayer());

        this.loadRes()

        const sss = new Map();
        let sym2 = Symbol("key"); // 可选的字符串key
        
    }

    private async loadRes()
    {
        const self = this;

        // 读取配置文件
        await RES.loadConfig();

        // 读取preload 先显示一张模糊的背景图
        await RES.loadGroup('preload');
        const preloadUI = new PreLoadingUI();
        GameLayerManager.gameLayer().addChild(preloadUI);

        // 主加载界面
        await RES.loadGroup("mainload");
        self.loadingView  = new MainLoadingUI();
        GameLayerManager.gameLayer().removeChild(preloadUI);
        GameLayerManager.gameLayer().addChild(self.loadingView);

        const loading:RES.PromiseTaskReporter = {
            onProgress(current: number, total: number){
                self.loadingView.setProgress(current,total);
            }
        };
        await RES.loadGroup("login",0,loading);
        await RES.loadGroup("hall", 1, loading);
        GameLayerManager.gameLayer().removeChild(this.loadingView);

        this.createGameScene();
    }

    /**
     * 创建游戏场景
     */
    private createGameScene():void {
        this.testEnJson();

        game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());

        // 打开login场景,打开loginUI
        game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_LOGIN);
        game.AppFacade.getInstance().sendNotification(LoginNotify.OPEN_LOGINUI);

    }

    //测试Json加密解密
    private testEnJson(): void{
        // var my = new newaes();
        // var key = "dily6666";//长度是8的倍数，是你的加密密码
        // var iv = "PKcs7";//PKcs7是一种编码标准不要修改

        // var times = new Date();
        // console.log(times.toLocaleDateString());
        // console.log(times.getMilliseconds().toString());

        // var str = { "name": "dily", "qq": "595850892" };
        
        // var newStr = JSON.stringify(str);
        // var myTest = my.ex(newStr, key, iv);
        
        // console.log(myTest.toString());

        // var yTest = my.dx(myTest.toString(), key, iv);
        // var yStr = JSON.parse(yTest);

        const test = RES.getRes('enJson_txt');

    }

}

