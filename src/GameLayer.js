var GameLayer = cc.LayerColor.extend({
    init: function() {
        cc.AudioEngine.getInstance().playMusic( 'effects/battle.mp3' , true );
        cc.AudioEngine.getInstance().setMusicVolume(0.3);

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.setKeyboardEnabled( true );

        this.addBackground();

        this.addArena();
        
        this.addShip();

        this.addCandy();

        this.addPowerUps();
        
        this.addScoreLabel();

        this.addTimeLabel();

        this.addSkillEffectP1();

        this.addSkillEffectP2();

        this.addLifeBar();
        
        this.addP1PowerAndRedlife();
       
        this.addP2PowerAndRedlife();
        
        this.addTimer();
        
        this.addPause();

        this.scheduleUpdate();
        return true;
    },
    addPause: function() {
        this.pause = 0;
        this.pausePic = cc.Sprite.create('images/pause.png');
        this.pausePic.setPosition(630,330);
        this.pausePic.setOpacity(0);
        this.pausePic.setScale(1.1);
        this.addChild(this.pausePic,10);
    },
    addShip: function() {
        this.ship = new Ship(1);
        this.ship.setPosition( new cc.Point( 260, 330 ) );
        this.addChild( this.ship ,2);
        this.ship.scheduleUpdate();
        
        this.ship2 = new Ship(2);
        this.ship2.setPosition( new cc.Point( 940, 330 ) );
        this.addChild( this.ship2 ,2);
        this.ship2.scheduleUpdate();
    },
    addBackground: function() {
        this.BG = new BG();
        this.BG.setPosition(new cc.Point(550,350));
        this.addChild(this.BG, 0);
    },
    addArena: function() {
        this.state = new Arena();
        this.state.setPosition(new cc.Point(600,325));
        this.addChild( this.state ,1);

        this.ArenaFall = new ArenaFall();
        this.ArenaFall.setPosition(new cc.Point(600,325));
        this.addChild( this.ArenaFall , 0);
    },
    addCandy: function() {
        this.candy = new Pickable(1);
        this.addChild( this.candy ,3);
        this.candy.randomPosition();
        this.candy.scheduleUpdate();

        this.Goldcandy = new Pickable(2);
        this.addChild( this.Goldcandy ,3);
        this.Goldcandy.randomPosition();
        this.Goldcandy.scheduleUpdate();
    },
    addPowerUps: function() {
        this.Carbos = new Pickable(3);
        this.addChild( this.Carbos ,3);
        this.Carbos.setPosition(9999999999999999999999,999999999999999999999);
        this.Carbos.scheduleUpdate();

        this.HpUp = new Pickable(4);
        this.addChild( this.HpUp ,3);
        this.HpUp.setPosition(9999999999999999999999,999999999999999999999);
        this.HpUp.scheduleUpdate();

        this.PPMax = new Pickable(5);
        this.addChild( this.PPMax ,3);
        this.PPMax.setPosition(9999999999999999999999,999999999999999999999);
        this.PPMax.scheduleUpdate();

        this.Protein = new Pickable(6);
        this.addChild( this.Protein ,3);
        this.Protein.setPosition(9999999999999999999999,999999999999999999999);
        this.Protein.scheduleUpdate();
    },
    addScoreLabel: function() {
        this.score1 = 0;
        this.scoreLabel1 = cc.LabelTTF.create('0', 'Arial', 40);
        this.scoreLabel1.setPosition( new cc.Point(250,570));
        this.addChild(this.scoreLabel1 ,10);

        this.score2 = 0;
        this.scoreLabel2 = cc.LabelTTF.create('0', 'Arial', 40);
        this.scoreLabel2.setPosition( new cc.Point(940,570));
        this.addChild(this.scoreLabel2 ,10);
    },
    addTimeLabel: function() {
        this.minuteLabel = cc.LabelTTF.create('0', 'Arial', 80);
        this.minuteLabel.setPosition( new cc.Point(540,600));
        this.addChild(this.minuteLabel ,10);

        this.colonLabel = cc.LabelTTF.create(':', 'Arial', 100);
        this.colonLabel.setPosition( new cc.Point(575,605));
        this.addChild(this.colonLabel ,10);

        this.secondLabel = cc.LabelTTF.create('0', 'Arial', 80);
        this.secondLabel.setPosition( new cc.Point(610,600));
        this.addChild(this.secondLabel ,10);

        this.tenSecondLabel = cc.LabelTTF.create('0', 'Arial', 80);
        this.tenSecondLabel.setPosition( new cc.Point(660,600));
        this.addChild(this.tenSecondLabel ,10);
    },
    addSkillEffectP1: function() {
        //mirror coat
        this.mirror = new Mirror();
        this.mirror.setPosition(this.ship.getPosition());
        this.addChild(this.mirror,2);
        this.mirror.setOpacity(0);
        this.mirror.scheduleUpdate();

        //Powerup
        this.powerUp1 = new PowerUp();
        this.addChild(this.powerUp1,2);
        this.powerUp1.scheduleUpdate();
        this.powerUp1.setScale(4);
        this.powerUp1.setOpacity(0);

        //Protect
        this.protect = new Protect();
        this.addChild(this.protect,2);
        this.protect.scheduleUpdate();
        this.protect.setScale(2);
        this.protect.setOpacity(0);

        //Splash
        this.splash = new Splash();
        this.addChild(this.splash,2);
        this.splash.scheduleUpdate();
        this.splash.setOpacity(0);
    },
    addSkillEffectP2: function() {
        //solarbeam
        this.solar = new Solarbeam();
        this.solar.setPosition(this.ship2.getPosition());
        this.addChild(this.solar,2);
        this.solar.setOpacity(0);
        this.solar.scheduleUpdate();

        this.solarHit = new SolarbeamHit();
        this.solarHit.setPosition(this.solar.getPosition());
        this.addChild(this.solarHit,2);
        this.solarHit.setOpacity(0);
        this.solarHit.scheduleUpdate();

        this.solarBound = new SolarbeamBoundary();
        this.solarBound.setPosition(this.ship2.getPosition());
        this.addChild(this.solarBound,-1);
        this.solarBound.scheduleUpdate();

        //vineWhip
        this.vineWhip = new Vinewhip();
        this.vineWhip.setPosition(this.ship2.getPosition());
        this.addChild(this.vineWhip,2);
        this.vineWhip.scheduleUpdate();
        this.vineWhipSize = 1;
        this.vineWhipDownSize = 0;

        this.vineTip = new VineTip(0);
        this.vineTip.setPosition(this.vineWhip.getPositionX(), this.vineWhip.getPositionY());
        this.addChild(this.vineTip,2);
        this.vineTip.scheduleUpdate();
        this.tipPosY = 0;
        this.tipPosX = 0;

        this.vineWhip.setOpacity(0);
        this.vineTip.setOpacity(0);

        //power up
        this.powerUp2 = new PowerUp();
        this.addChild(this.powerUp2,2);
        this.powerUp2.scheduleUpdate();
        this.powerUp2.setScale(4);
        this.powerUp2.setOpacity(0);
    },
    addLifeBar: function() {
        this.life = new Health();
        this.life.setPosition(new cc.Point(253, 613));
        this.addChild( this.life ,4);

        this.life2 = new Health();
        this.life2.setPosition(new cc.Point(937, 613));
        this.addChild( this.life2 ,4);

    },
    addP1PowerAndRedlife: function() {
        this.P1Redhealth = [];
        this.P1Redhealth[0] = new RedHealth();
        this.P1Redhealth[0].setPosition(new cc.Point(397, 619));
        this.addChild( this.P1Redhealth[0] ,5);
        this.P1Redhealth[0].setOpacity(0);
        this.P1Redhealth[0].scheduleUpdate();

        for(var i=1; i<29; i++){
            this.P1Redhealth[i] = new RedHealth2();
            this.P1Redhealth[i].setPosition(new cc.Point(395-(10*i), 619));
            this.addChild( this.P1Redhealth[i] ,5);
            this.P1Redhealth[i].setOpacity(0);
            this.P1Redhealth[i].scheduleUpdate();
        }
        
        this.P1Redhealth[29] = new RedHealth3();
        this.P1Redhealth[29].setPosition(new cc.Point(109, 620));
        this.addChild( this.P1Redhealth[29] ,5);
        this.P1Redhealth[29].setOpacity(0);
        this.P1Redhealth[29].scheduleUpdate();

        //Power
        this.P1Power = [];
        for(var i=0; i<26; i++){
            this.P1Power[i] = new Power();
            this.P1Power[i].setPosition(new cc.Point(127+(10*i), 605));
            this.addChild( this.P1Power[i] ,3);
            this.P1Power[i].scheduleUpdate();
        }
    },
    addP2PowerAndRedlife: function() {
        this.P2Redhealth = [];
        this.P2Redhealth[0] = new RedHealth();
        this.P2Redhealth[0].setPosition(new cc.Point(1081, 619));
        this.addChild( this.P2Redhealth[0] ,5);
        this.P2Redhealth[0].setOpacity(0);
        this.P2Redhealth[0].scheduleUpdate();

        for(var i=1; i<29; i++){
            this.P2Redhealth[i] = new RedHealth2();
            this.P2Redhealth[i].setPosition(new cc.Point(1079-(10*i), 619));
            this.addChild( this.P2Redhealth[i] ,5);
            this.P2Redhealth[i].setOpacity(0);
            this.P2Redhealth[i].scheduleUpdate();
        }
        this.P2Redhealth[29] = new RedHealth3();
        this.P2Redhealth[29].setPosition(new cc.Point(792, 620));
        this.addChild( this.P2Redhealth[29] ,5);
        this.P2Redhealth[29].setOpacity(0);
        this.P2Redhealth[29].scheduleUpdate();

        //Power
        this.P2Power = [];
        for(var i=0; i<26; i++){
            this.P2Power[i] = new Power();
            this.P2Power[i].setPosition(new cc.Point(811+(10*i), 605));
            this.addChild( this.P2Power[i] ,3);
            this.P2Power[i].scheduleUpdate();
        }
    },
    addTimer: function() {
        this.gameTime = 91; // second
        this.endTime = 2.5;

        this.timeUpPic = new TimeIsUp();
        this.addChild( this.timeUpPic ,10);
        this.timeUpPic.setPosition(600,350);
        this.timeUpPic.setScale(2.5);
        this.timeUpPic.setOpacity(0);
        this.timeUpPic.scheduleUpdate();

        //Out of arena
        this.outP1 = 0;
        this.outP2 = 0;

        //Pickables
        this.GoldcandyTimer = 0;
        this.PowerUpsTimer = 1;

        //Skill
        this.struckTime1 = 2;
        this.ProtectTime = 0.75;
        this.splashTime = 0.5;
    },
    onKeyDown: function( e ) {
        if( e == 32){
            if(this.pause == 0){
                cc.AudioEngine.getInstance().playEffect( 'effects/Click.m4a' );
                this.pause = 1;
            }
            else if(this.pause == 1){
                cc.AudioEngine.getInstance().playEffect( 'effects/Click2.m4a' );
                this.pause = 0;
            }
        }
        if(this.pause == 0){
            
            this.P1KeyDown( e );
            this.P2KeyDown( e );

        }
    },
    P1KeyDown: function( e ) {
        if ( e == cc.KEY.w && this.ship.stat == 0) {
            this.ship.Whendown();
        }
        if ( e == cc.KEY.d && this.ship.stat != 3 && this.ship.power >= 75 && this.ship.WhichSkillIsActivate == 'none') {
            cc.AudioEngine.getInstance().playEffect( 'effects/Shield.m4a' );
            this.ship.power -= 75;
            this.ship.UseSkill('mirror coat');
            this.mirror.setOpacity(210);
        }
        if ( e == cc.KEY.s && this.ship.stat != 3 && this.ship.power >= 45 && this.ship.WhichSkillIsActivate == 'none') {
            cc.AudioEngine.getInstance().playEffect( 'effects/Shield.m4a' );
            this.ship.power -= 45;
            this.ship.UseSkill('protect');
            this.protect.setOpacity(170);
        }
        if ( e == cc.KEY.a && this.ship.stat != 3 && this.ship.power >= 3 && this.ship.WhichSkillIsActivate == 'none') {
            cc.AudioEngine.getInstance().playEffect( 'effects/Splash.m4a' );
            this.ship.power -= 2;
            this.ship.UseSkill('splash');
            this.ship.health += 5;
            this.splash.setOpacity(200);
        }
    },
    P2KeyDown: function( e ) {
        if ( e == cc.KEY.i && this.ship2.stat == 0){
            this.ship2.Whendown();
        }
        if ( e == cc.KEY.l && this.ship2.stat != 3 && this.ship2.power >= this.ship2.Maxpower) {
            if(this.ship2.power > 0){
                cc.AudioEngine.getInstance().playEffect( 'effects/Solarbeam.m4a' );
                this.ship2.UseSkill('solar beam');
                this.solar.setOpacity(300);
            }
            else{
                this.ship2.WhichSkillIsActivate = 'none';
                this.solar.setOpacity(0);
            }
        }
        if ( e == cc.KEY.k && this.ship2.stat != 3 && this.ship2.power >= 50) {
            cc.AudioEngine.getInstance().playEffect( 'effects/Vine.m4a' );
            this.ship2.power -= 50;
            this.vineTip.direction = this.vineTip.getRotation();
            this.vineWhip.setOpacity(300);
            this.vineTip.setOpacity(300);
            this.ship2.UseSkill('vine whip');
        }
        if ( e == cc.KEY.j && this.ship2.stat != 3 && this.ship2.power >= 30) {
            cc.AudioEngine.getInstance().playEffect( 'effects/Shield.m4a' );
            this.ship2.power -= 30;
            this.ship2.baseAtk += 1.3;
            this.ship2.GetBuff('power Up');
            this.powerUp2.setOpacity(300);
        }
    },
    onKeyUp: function( e ) {
        if(this.pause == 0){
        //Player1
        if ( e == cc.KEY.w && this.ship.stat != 3) {
            this.ship.WhenUp();
        }

        //Player2
        if ( e == cc.KEY.i && this.ship2.stat != 3) {
            this.ship2.WhenUp();
        }
        if ( e == cc.KEY.l && this.ship2.stat != 3 && this.ship2.WhichSkillIsActivate == 'solar beam') {
            this.ship2.WhichSkillIsActivate = 'none';
            this.solar.setOpacity(0);
        }
        }
    },
    PickItem: function( ship, pick ){
        if ( pick.closeTo( ship ) && ship.stat != 3) {
            cc.AudioEngine.getInstance().playEffect( 'effects/Pick.m4a' );
            if(pick.item == 1){
                this.candy.randomPosition();
            }
            else if(pick.item == 2){
                this.Goldcandy.setPosition(9999999999999999999999,999999999999999999999);
                this.GoldcandyTimer = 15;
            }
            else if(pick.item == 3){
                ship.acc += 0.1;
                this.Carbos.setPosition(9999999999999999999999,999999999999999999999);
                this.PowerUpsTimer = 5;
            }
            else if(pick.item == 4){
                ship.Maxhealth += 30;
                ship.health += 25;
                this.HpUp.setPosition(9999999999999999999999,999999999999999999999);
                this.PowerUpsTimer = 5;
            }
            else if(pick.item == 5){
                ship.Maxpower += 10;
                this.PPMax.setPosition(9999999999999999999999,999999999999999999999);
                this.PowerUpsTimer = 5;
            }
            else if(pick.item == 6){
                ship.baseAtk += 1.3;
                ship.GetBuff('power Up');
                this.Protein.setPosition(9999999999999999999999,999999999999999999999);
                this.PowerUpsTimer = 5;
                if(ship == this.ship){
                    this.powerUp1.setOpacity(300);
                }
                if(ship == this.ship2){
                    this.powerUp2.setOpacity(300);
                }
            }


            ship.score += pick.plusScore;
            //health
            if(ship.health < ship.Maxhealth){
                 ship.health += pick.plusHealth;
            }
            else{
                ship.health = ship.Maxhealth;
            }
            //power
            if(ship.power < ship.Maxpower){
                ship.power += pick.plusPow;
            }
            else{
                ship.power = ship.Maxpower;
            }
        }
    },
    updateGameTime: function() {
        if(this.gameTime > 0){
            this.gameTime -= 0.015;
        }
        else{
            this.gameTime = 0;
            this.timeUpPic.setOpacity(300);
            this.ship.stat = 3;
            this.ship2.stat = 3;
        }
        this.minuteLabel.setString(Math.floor(this.gameTime/60));
        this.secondLabel.setString(Math.floor((this.gameTime%60)/10));
        this.tenSecondLabel.setString(Math.floor((this.gameTime%60)%10));
    },
    updateOnArena: function() {
        if(!cc.rectIntersectsRect( this.ship.getBoundingBox(), this.ArenaFall.getBoundingBox())){
            if(this.ship.stat != 3){
                this.ship.health -= 0.15;
                this.outP1 += 0.015;
                if(this.outP1 >= 3){
                    this.ship.setPosition(600,330);
                    this.ship.score -= 10;
                }
            }
        }
        else{
            this.outP1 = 0;
        }
       
        if(!cc.rectIntersectsRect( this.ship2.getBoundingBox(), this.ArenaFall.getBoundingBox())){
            if(this.ship2.stat != 3){
                this.ship2.health -= 0.15;
                this.outP2 += 0.015;
                if(this.outP2 >= 3){
                    this.ship2.setPosition(600,330);
                    this.ship2.score -= 10;
                }
            }
        }
        else{
            this.outP2 = 0;
        }
    },
    updateGoldCandyTimer: function() {
        if(this.GoldcandyTimer > 0){
            this.GoldcandyTimer -= 0.015; 
        }
        else{
            this.Goldcandy.randomPosition();
            this.GoldcandyTimer = 10000;
        }
    },
    updatePowerUpsTimer: function() {
        if(this.PowerUpsTimer > 0){
            this.PowerUpsTimer -= 0.015;
        }
        else{
            var randomItem = Math.random();
            // var randomItem = 0.25;
            if(randomItem >= 0 && randomItem < 0.25){
                this.Carbos.randomPosition();
            }
            else if(randomItem >= 0.25 && randomItem < 0.50){
                this.Protein.randomPosition();
            }
            else if(randomItem >= 0.50 && randomItem < 0.75){
                this.PPMax.randomPosition();
            }
            else if(randomItem >= 0.75 && randomItem <= 1){
                this.HpUp.randomPosition();
            }
            this.PowerUpsTimer = 10000;
        }
    },
    updateGetHit: function() {
        if( this.ship.closeTo( this.ship2 ) && this.ship2.stat != 3 && this.ship.WhichSkillIsActivate != 'protect'){
            this.ship.afterGetHit( this.ship2 );
    
            //mirror coat
            if(this.ship.WhichSkillIsActivate == 'mirror coat'){
                this.mirror.setOpacity(0);
                this.ship.WhichSkillIsActivate = 'none';
            }
            if(this.ship2.buff == 'power Up' && this.ship.stat != 3){
                this.ship2.baseAtk = 0.3;
                this.ship2.buff = 'none';
                this.powerUp2.setOpacity(0);
            }
        }

        //Venesaur
        if( this.ship2.closeTo( this.ship ) && this.ship.stat != 3 ){
            this.ship2.afterGetHit( this.ship );

            if(this.ship.buff == 'power Up' && this.ship.stat != 3){
                this.ship.baseAtk = 0.35;
                this.ship.buff = 'none';
                this.powerUp1.setOpacity(0);
            }

        }
    },
    updateLifeBars: function() {
        for(var i = 0; i<30; i++){
            if((this.ship.health/this.ship.Maxhealth)*100 < ((i/29)*100 )){
                this.P1Redhealth[29-i].setOpacity(500);
            }else{
                this.P1Redhealth[29-i].setOpacity(0);
            }
        }

        for(var i = 0; i<30; i++){
            if((this.ship2.health/this.ship2.Maxhealth)*100 < ((i/29)*100)){
                this.P2Redhealth[29-i].setOpacity(500);
            }else{
                this.P2Redhealth[29-i].setOpacity(0);
            }
        }
    },
    updatePowerBars: function() {
        for(var i = 0; i<26; i++){
            if((this.ship.power/this.ship.Maxpower)*100 < ((i/26)*100)){
                 this.P1Power[i].setOpacity(0);
            }else{
                this.P1Power[i].setOpacity(500);
            }
        }

        for(var i = 0; i<26; i++){
            if((this.ship2.power/this.ship2.Maxpower)*100 < ((i/26)*100)){
                 this.P2Power[i].setOpacity(0);
            }else{
                this.P2Power[i].setOpacity(500);
            }
        }
    },
    updateSkillMirrorCoat: function() {
        this.mirror.setPosition(this.ship.getPosition());
        this.mirror.setRotation(this.ship.getRotation());
    },
    updateSkillSolarBeam: function() {
        var P2pos = this.ship2.getPosition();
        this.solar.setPosition(P2pos.x ,P2pos.y);
        this.solarBound.setPosition(P2pos.x ,P2pos.y);
        this.solar.setAnchorPoint(0.5,1);
        this.solarBound.setAnchorPoint(0.5,1);
        this.solar.setRotation(this.ship2.getRotation());
        this.solarBound.setRotation(this.ship2.getRotation());
        
        if(this.solar.getOpacity() == 300){
            this.ship2.baseRotateSpeed = 2;
            if(this.ship2.power > 0){
                this.ship2.power -= 2;
                if(cc.rectIntersectsRect( this.solarBound.getBoundingBox(), this.ship.getBoundingBox())){
                    this.ship.GetHitBySkill('solar beam', this.ship2);
                    this.solarHit.setPosition(this.ship.getPosition());
                    this.solarHit.setOpacity(300);
                }
                else{
                    this.solarHit.setOpacity(0);
                }
            }
            else{
                this.ship2.WhichSkillIsActivate = 'none';
                this.solar.setOpacity(0);
                this.solarHit.setOpacity(0);
            }
        }
        else{
            this.ship2.baseRotateSpeed = 3;
            this.solarHit.setOpacity(0);
        }
    },
    updateSkillVineWhip: function() {
        var P2pos = this.ship2.getPosition();
        if(this.ship2.WhichSkillIsActivate == 'vine whip'){
            if(this.vineWhipSize < 22){
                this.vineWhipSize += 0.75;
                this.tipPosX += Math.sin(this.vineTip.direction/180*Math.PI)*17.5;
                this.tipPosY += Math.cos(this.vineTip.direction/180*Math.PI)*17.5;
                this.vineWhip.setScale(1,this.vineWhipSize);
                this.vineWhipDownSize = this.vineWhipSize;
            }
            else if(this.vineWhipDownSize > 1){
                this.vineWhipDownSize -= 0.75;
                this.tipPosX -= Math.sin(this.vineTip.direction/180*Math.PI)*17.5;
                this.tipPosY -= Math.cos(this.vineTip.direction/180*Math.PI)*17.5;
                this.vineWhip.setScale(1,this.vineWhipDownSize);
                
            }
            else{
                this.vineWhip.setOpacity(0);
                this.vineTip.setOpacity(0);
                this.vineWhipSize = 1;
                this.vineWhipDownSize = 0;
                this.tipPosY = 0;
                this.tipPosX = 0;
                this.ship2.WhichSkillIsActivate = 'none';
            }

            if(cc.rectIntersectsRect(this.ship.getBoundingBox(), this.vineTip.getBoundingBox()) && this.ship.health > 0){
                console.log("hit");
                this.ship.GetHitBySkill('vine whip' , this.ship2);
                this.mirror.setOpacity(0);

                this.tipPosY = 0;
                this.tipPosX = 0;
                this.vineTip.setPosition(this.vineWhip.getPositionX() , this.vineWhip.getPositionY());
                this.vineWhip.setOpacity(0);
                this.vineTip.setOpacity(0);
                this.vineWhipSize = 1;
                this.vineWhipDownSize = 0;
                this.ship2.WhichSkillIsActivate = 'none';
            }
        }
        else{
            this.vineWhip.setRotation(this.ship2.getRotation());
            this.vineTip.setRotation(this.ship2.getRotation());
        }

        this.vineWhip.setPosition(P2pos.x ,P2pos.y);
        this.vineWhip.setAnchorPoint(4,0.02);

        this.vineTip.setPosition(this.vineWhip.getPositionX() + this.tipPosX , this.vineWhip.getPositionY() + this.tipPosY);
        this.vineTip.setAnchorPoint(2.5, -0.4);
            //timer Vinewhip struck
        if(this.ship.struck == true){
            if(this.struckTime1 > 0){
                this.struckTime1 -= 0.015;
            }
            else{
                this.ship.struck = false;
                this.struckTime1 = 4;
            }
        }
    },
    updateSkillProtect: function() {
        this.protect.setPosition(this.ship.getPosition());
            //Protect time
            if(this.ship.WhichSkillIsActivate == 'protect'){
                if(this.ProtectTime > 0){
                    this.ProtectTime -= 0.015;
                }
                else{
                    this.protect.setOpacity(0);
                    this.ProtectTime = 0.75;
                    this.ship.WhichSkillIsActivate = 'none';
                }
            }
    },
    updateSkillSplash: function() {
        this.splash.setPosition(this.ship.getPosition());
            //Splash time
            if(this.ship.WhichSkillIsActivate == 'splash'){
                if(this.splashTime > 0){
                    this.splashTime -= 0.015;
                    if(this.splashTime > 0.25){
                        this.ship.setScale(1,this.splashTime+0.05);
                    }
                    else{
                        this.ship.setScale(1,this.splashTime+1);
                    }
                }
                else{
                    this.splash.setOpacity(0);
                    this.splashTime = 0.5;
                    this.ship.WhichSkillIsActivate = 'none';
                }
            }
    },
    updateSkillPowerUp: function() {
        //P1
        this.powerUp1.setPosition(this.ship.getPositionX(), this.ship.getPositionY());
        this.powerUp1.setAnchorPoint(0.5,0.2);
        this.powerUp1.setRotation(this.ship.getRotation()-180);

        //P2
        this.powerUp2.setPosition(this.ship2.getPositionX(), this.ship2.getPositionY());
        this.powerUp2.setAnchorPoint(0.5,0.2);
        this.powerUp2.setRotation(this.ship2.getRotation()-180);
    },
    updateDead: function() {
        if(this.ship.stat == 3){
            this.mirror.setOpacity(0);
            this.powerUp1.setOpacity(0);
            this.protect.setOpacity(0);
            this.splash.setOpacity(0);
        }
        if(this.ship2.stat == 3){
            this.solar.setOpacity(0);
            this.solarHit.setOpacity(0);
            this.vineWhip.setOpacity(0);
            this.vineTip.setOpacity(0);
            this.powerUp2.setOpacity(0);
        }
    },
    updateGameEnd: function() {
        if(this.gameTime <= 0){
            if(this.endTime > 0){
                this.endTime -= 0.015;
            }
            else{
                cc.AudioEngine.getInstance().stopMusic();
                var director = cc.Director.getInstance();
                director.replaceScene(cc.TransitionFade.create(1.5, new Scorescene( this.ship.score , this.ship2.score , this.ship.health , this.ship2.health )));
            }
        }

        if(this.ship.health <= 0 || this.ship2.health <= 0){
            if(this.endTime > 0){
                this.endTime -= 0.015;
            }
            else{
                cc.AudioEngine.getInstance().stopMusic();
                var director = cc.Director.getInstance();
                director.replaceScene(cc.TransitionFade.create(1.5, new Scorescene( this.ship.score , this.ship2.score , this.ship.health , this.ship2.health )));
            }
        }
    },
    update: function() {
        if(this.pause == 0){
            this.updateGameTime();
        
            this.updateOnArena();
        
            this.scoreLabel1.setString(this.ship.score);
            this.PickItem(this.ship, this.candy);
            this.PickItem(this.ship, this.Goldcandy);
            this.PickItem(this.ship, this.Carbos);
            this.PickItem(this.ship, this.HpUp);
            this.PickItem(this.ship, this.PPMax);
            this.PickItem(this.ship, this.Protein);

            this.scoreLabel2.setString(this.ship2.score);
            this.PickItem(this.ship2, this.candy);
            this.PickItem(this.ship2, this.Goldcandy);
            this.PickItem(this.ship2, this.Carbos);
            this.PickItem(this.ship2, this.HpUp);
            this.PickItem(this.ship2, this.PPMax);
            this.PickItem(this.ship2, this.Protein);

            this.updateGoldCandyTimer();

            this.updatePowerUpsTimer();

            this.updateGetHit();
            
            this.updateLifeBars();

            this.updatePowerBars();
            
            this.updateSkillMirrorCoat();

            this.updateSkillSolarBeam();

            this.updateSkillVineWhip();
     
            this.updateSkillPowerUp();

            this.updateSkillProtect();
     
            this.updateSkillSplash();
     
            this.updateDead();
        //----------------------------------after unpause-----------------------------------//
            this.ship.baseRotateSpeed = 3;
            this.ship.regenmp = 0.01;
            this.ship2.regenmp = 0.01;
        }
        
        else{
            this.ship.setPosition(this.ship.getPosition());
            this.ship2.setPosition(this.ship2.getPosition());
            this.ship.baseRotateSpeed = 0;
            this.ship2.baseRotateSpeed = 0;
            this.ship.regenmp = 0;
            this.ship2.regenmp = 0;
        }

        //-------------------------------pausepic-----------------------------------//
        if(this.pause == 0){
            this.pausePic.setOpacity(0);
        }
        else{
            this.pausePic.setOpacity(220);
        }

        //------------------------------game end------------------------------------//
        this.updateGameEnd();
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

//item = 1 candy
//item = 2 Goldcandy

// stat 0 stop and rotate
// stat 1 move stop rotate
// stat 2 gethit
// stat 3 dead
// stat 4 use skill

// character 1 wobuffet
// character 2 venesaur