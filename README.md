# 新版游戏说明

@(段鹏举)[段鹏举 2017.11.21]

-------
[TOC]

## 1. 概要设计

棋牌游戏早已白热化，传统房卡模式竞争日益激烈，新棋牌游戏需要改良运营思路才能生存。此次游戏的设计参考电商的发展路线。把现有的若干个小棋牌游戏公司想象成B端，他们的代理想象成小B端，用户则是C端。那么现在棋牌游戏的布局则是若干个B ---> 小B ---> C。这个模型很像电商之前的实体店铺，每个实体店就相当于一个B，各干各的生意。天下大事，分久必合合久必分，马爸爸就做了件事情，创办B ---> C的淘宝商城，把他们全部整合起来。借鉴这个思路，个人感觉棋牌游戏的布局也会往这个方向发展。如果思路没错，我们需要做的就是一个F（棋牌游戏工厂，我们） ---> B(代理) ---> C（用户）的棋牌游戏商城，省去了小棋牌游戏公司的环节，或者说让每个小B（代理）都成为了小游戏公司，而我们整合了他们！

-------

## 2. 详细说明
### 2.1 产品内容

1.0版本计划上线H5游戏大厅，能运行在各种浏览器中，依次制作以下游戏
- [ ] [牛牛](#niuniu)
- [ ] [推筒子](#tuitongzi)
- [ ] [推牌九](#paijiu)
- [ ] [掷筛子](#shaizi)
- [ ] [跑狗](#paogou)
### 2.2 产品流程（从C端出发）
根据用户的实时状态展现不同的内容，如用户进入游戏时未加入任何娱乐场，则进入官方娱乐场，如果有直接进入对应的娱乐场即可。初期可不展示或搜索所有娱乐场，淡化官方的概念，让用户觉得该游戏就是某某代理开发的。[用户加入娱乐场的方式](#joinyuelechang)
### 2.3 产品流程（从B端出发）
代理需要开通权限才可以拥有并管理自己的娱乐场，详见[代理开通娱乐场的方式](#kaitongyulechang)，之后便可以自行推广，拉入玩家产生盈利，每个娱乐场都会有钱包系统，详细记录了此娱乐场的线上流水。当然，娱乐场并不是收费的，详见[娱乐场的收费方式](#shoufei)。如果娱乐场是有效的，则可以进行日常管理，详见[娱乐场的权限管理](#guanliyulechang)

### 2.4 <span id="joinyuelechang">用户加入娱乐场的方式</span>
首先讲一下我在做H5游戏获得的一个经验就是，新用户打开页面的速度越快，流失概率越小，所以要做到让用户秒开界面，而要打开一个H5游戏，需要加载许多东西，很难做到秒开，那么就让用户刚开始打开一个html网页来登录吧，见[页面介绍](#yemianshuoming)。对于散户，打开之后给他一个排序之后的列表，也可以根据分享的查询参数自动选择，可以自由选择进行账户与娱乐场的绑定。对于绑定过娱乐场的用户，则直接进入游戏场，加载游戏、打开游戏。
    
```flow
st=>start: 点击入口链接（html）
e=>end: 进入游戏
op1=>operation: 娱乐场绑定检测
sub1=>subroutine: 游戏场选择界面（html）
cond=>condition: 是否绑定游戏场?
op2=>operation: Session检测
sub2=>subroutine: 游戏登录界面（html）
cond2=>condition: Session是否有效?
io=>inputoutput: 游戏加载页面(Egret)
io2=>inputoutput: 游戏过度页面，类似于启动图（html）

st->io2->op1->cond
cond(yes)->op2->cond2
cond(no)->sub1(right)->op1
cond2(yes)->io->e
cond2(no)->sub2(right)->op2
```

### 2.5 <span id="kaitongyulechang">代理开通娱乐场的方式</span>
通过后台管理系统以某个管理员身份进行开通，给大H5渠道提供管理员功能，记录每个管理员开通的代理明细，以及这些代理的流水明细。需要代理提供以下信息
    - 手机号验证
    - 身份证
    - 第三方检测平台如人脸检测
    - 签署《合作协议》
### 2.6 <span id="shoufei">娱乐场的收费方式</span>
总的原则是不能让代理垫付一分钱，见利分利或者买断，根据代理的自身情况提供几种方案供其选择。
    - 买断形式，一次性付费x万元，享受所有游戏、所有权限，及后续更新。
    - 分期形式，可按月、按季、按年进行付款，每种形式里又按照权限等级进行区分，如部分游戏、部分权限套餐，全部游戏、全部权限套餐。选择此形式的代理，获赠X天免费试用。
    - 合作形式，考察代理的实际能力，选择合作分成制，开通所有游戏、所有权限。
    - 另外可推出[高级权限]()，让代理自行选择是否购买。高级权限不可买断，按天先付费后使用。

### 2.7 <span id="guanliyulechang">娱乐场的权限管理</span>
 分为[基本权限](#jibenquanxian)和[高级权限](#gaojiquanxian),权限每个代理单独化配置，存在数据库中。
### 2.8 <span id="jibenquanxian">基本权限</span>
- 邀请新用户至自己的游戏场
- 移出某个自己游戏场的用户
- 开设房间
- 解散房间
- 自定义商城售卖内容（提供列表自行选择）
- 自定价商城商品
### 2.9 <span id="gaojiquanxian">高级权限</span>
- 给某个玩家设定赔率
- 查看某个玩家的手牌
- 给某个玩家换牌
- 给某个玩家自定义发牌
- 各种统计数据

-------

## 3. 游戏说明
### 3.1 <span id="yemianshuoming">页面介绍</span>
#### C端游戏外（html）
- 过度页面
> 相当于启动图，展示一张宣传图类似的即可

- 游戏场选择页面
> 让用户手动选择或收到邀请后点击打开的页面，通过查询参数可自动帮助用户选择，点击确认进行绑定，之后进入登录页面

- 登录页面
> 当session失效时进入游戏打开此页面，因苹果限制如果没有一次点击事件进入游戏，则没有声音。

- 娱乐场邀请页面
> 用于代理邀请用户时展示的页面，有协议之类的内容

#### C端游戏内（egret）
- 大厅页面
> 游戏大厅，还未想好

#### 代理后台（html）
- 后台登录页面
> 能够进行管理游戏，运行在微信浏览器内

### 3.2 <span id="niuniu">牛牛玩法说明<span/>
待补充
### 3.3 <span id="tuitongzi">推筒子玩法说明<span/>
待补充
### 3.4 <span id="paijiu">推牌九玩法说明<span/>
待补充
### 3.5 <span id="shaizi">掷筛子玩法说明<span/>
待补充
### 3.6 <span id="paogou">跑狗玩法说明<span/>
待补充
    
-----

