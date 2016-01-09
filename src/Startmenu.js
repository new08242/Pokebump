var StartmenuLayer = cc.LayerColor.extend({
	ctor: function(){
		this._super();
	},
	init: function() {

		this.cursorpos = 1;

		this.setKeyboardEnabled( true );
		cc.AudioEngine.getInstance().playMusic( 'effects/mainTheme.mp3' , true );
		cc.AudioEngine.getInstance().setMusicVolume(0.35);

		var bg = cc.Sprite.create('images/BGStart.png');
		bg.setPosition(550,400);
		bg.setScale(4.75);
		this.addChild(bg,0);

		var Startbutton = cc.Sprite.create('images/startbutton.png');
		Startbutton.setPosition(1030,420);
		this.addChild(Startbutton,1);

		this.StartbuttonHi = cc.Sprite.create('images/startbuttonHi.png');
		this.StartbuttonHi.setPosition(Startbutton.getPosition());
		this.addChild(this.StartbuttonHi,1);
		this.StartbuttonHi.setOpacity(0);
		this.StartbuttonHi.scheduleUpdate();

		var Howbutton = cc.Sprite.create('images/howtobutton.png');
		Howbutton.setPosition(1030,320);
		this.addChild(Howbutton,1);

		this.HowbuttonHi = cc.Sprite.create('images/howtobuttonHi.png');
		this.HowbuttonHi.setPosition(Howbutton.getPosition());
		this.addChild(this.HowbuttonHi,1);
		this.HowbuttonHi.setOpacity(0);
		this.HowbuttonHi.scheduleUpdate();

		this.degree = 0;
		this.Pokeball = cc.Sprite.create('images/Pokeball.png');
		this.Pokeball.setPosition(540,300);
		this.Pokeball.setScale(0.90);
		this.addChild(this.Pokeball,1);

		this.logosize = 0;
		this.times = 0;
		this.opa = 270;
		this.Pokelogo = cc.Sprite.create('images/PokeBumpLogo.png');
		this.Pokelogo.setPosition(540,500);
		this.addChild(this.Pokelogo,2);

		this.movetime = 0.25;
		this.direction = 0;
		this.characrter1 = cc.Sprite.create('images/bulbasaur.png');
		this.characrter1.setPosition(1050,130);
		this.characrter1.setRotation(180);
		this.characrter1.setScale(1.5);
		this.addChild(this.characrter1,1);

		this.characrter2 = cc.Sprite.create('images/Charizard.png');
		this.characrter2.setPosition(120,580);
		this.characrter2.setRotation(-40);
		this.addChild(this.characrter2,1);

		this.characrter3 = cc.Sprite.create('images/haunter.gif');
		this.characrter3.setPosition(1080,560);
		this.characrter3.setScale(0.6);
		this.addChild(this.characrter3,1);

		this.characrter4 = cc.Sprite.create('images/Pikachu.png');
		this.characrter4.setPosition(180,175);
		this.characrter4.setScale(0.85);
		this.addChild(this.characrter4,1);

		this.characrter5 = cc.Sprite.create('images/wobuffet.png');
		this.characrter5.setPosition(800,130);
		this.characrter5.setScale(1.5);
		this.addChild(this.characrter5,1);

		this.scheduleUpdate();
		return true;
	},
	onKeyDown: function( e ) {

		if ( e == cc.KEY.down ) {
        	var ran = Math.random();
			if(ran < 0.5){
				cc.AudioEngine.getInstance().playEffect( 'effects/Click.m4a' );
			}
			else{
				cc.AudioEngine.getInstance().playEffect( 'effects/Click2.m4a' );
			}
			if(this.cursorpos == 1){
				this.cursorpos = 2;
			}
            else if(this.cursorpos == 2){
				this.cursorpos = 1;
			}
        }
		if ( e == cc.KEY.up ) {
			var ran = Math.random();
			if(ran < 0.5){
				cc.AudioEngine.getInstance().playEffect( 'effects/Click.m4a' );
			}
			else{
				cc.AudioEngine.getInstance().playEffect( 'effects/Click2.m4a' );
			}
			if(this.cursorpos == 1){
				this.cursorpos = 2;
			}
            else if(this.cursorpos == 2){
				this.cursorpos = 1;
			}
        }
        if ( e == 13 ) {
        	var ran = Math.random();
			if(ran < 0.5){
				cc.AudioEngine.getInstance().playEffect( 'effects/Click.m4a' );
			}
			else{
				cc.AudioEngine.getInstance().playEffect( 'effects/Click2.m4a' );
			}
        	cc.AudioEngine.getInstance().stopMusic();
        	var director = cc.Director.getInstance();
        	if(this.cursorpos == 1){
        		director.replaceScene(cc.TransitionFade.create(1.5, new StartScene()));
        	}
        	else if(this.cursorpos == 2){
        		director.replaceScene(cc.TransitionFade.create(1.5, new InstructionScene()));
        	}
        }
	},
	update: function (){

		if(this.degree <= 360){
			this.degree+=2.5;
		}
		else{
			this.degree = 0;
		}
		this.Pokeball.setRotation(this.degree);

		if(this.times < 2){
			if(this.logosize <= 1){
				if(this.times == 0){
					cc.AudioEngine.getInstance().playEffect( 'effects/Po.m4a' );
				}
				else{
					cc.AudioEngine.getInstance().playEffect( 'effects/Ke.m4a' );
				}
				this.logosize+= 0.025;
			}
			else if(this.logosize >= 1){
				this.logosize = 0;
				this.times++;
				cc.AudioEngine.getInstance().playEffect( 'effects/bump2.m4a' );
			}
		}
		else{
			if(this.times == 2 ){
				if(this.logosize <= 6){
					this.logosize+= 0.07;
					this.Pokelogo.setRotation(this.Pokelogo.getRotation()+5);
				}
				else if(this.logosize > 3){
					this.times++;
				}
			}
	
			if(this.times == 3){
				if(this.logosize > 0.8){
					this.logosize -= 0.07;
					this.Pokelogo.setRotation(this.Pokelogo.getRotation()+8.6);
				}
				else{
					this.Pokelogo.setRotation(0);
					this.logosize = 0.8;
					this.times++;
				}
			}
		}

		if(this.times == 4){
			if(this.opa > 190){
				this.opa -= 1.7;
			}
			else{
				this.times++;
			}
		}
		else if(this.times == 5){
			if(this.opa < 270){
				this.opa += 1.7;
			}
			else{
				this.times--;
			}
		}

		this.Pokelogo.setOpacity(this.opa);
		this.Pokelogo.setScale(this.logosize);

		if(this.movetime > 0){
			this.movetime -= 0.015;
			var rotate = 0.7;
			if(this.direction == 0){
				this.characrter1.setRotation(this.characrter1.getRotation()+rotate);
				this.characrter2.setRotation(this.characrter2.getRotation()+rotate);
				this.characrter3.setRotation(this.characrter3.getRotation()+rotate);
				this.characrter4.setRotation(this.characrter4.getRotation()+rotate);
				this.characrter5.setRotation(this.characrter5.getRotation()+rotate);
			}
			else{
				this.characrter1.setRotation(this.characrter1.getRotation()-rotate);
				this.characrter2.setRotation(this.characrter2.getRotation()-rotate);
				this.characrter3.setRotation(this.characrter3.getRotation()-rotate);
				this.characrter4.setRotation(this.characrter4.getRotation()-rotate);
				this.characrter5.setRotation(this.characrter5.getRotation()-rotate);
			}
		}
		else{
			if(this.direction == 0){
				this.direction = 1;
			}
			else{
				this.direction = 0;
			}
			this.movetime = 0.25;
		}

		if(this.cursorpos == 1){
			this.StartbuttonHi.setOpacity(300);
			this.HowbuttonHi.setOpacity(0);
		}
		else{
			this.HowbuttonHi.setOpacity(300);
			this.StartbuttonHi.setOpacity(0);
		}
	}
});
var StartmenuScene = cc.Scene.extend({
	ctor: function (){
		this._super();
		var layer = new StartmenuLayer();
		layer.init();
		this.addChild(layer);
	}
});