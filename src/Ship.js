var Ship = cc.Sprite.extend({
    ctor: function(name) {
        this._super();
        this.direction = 0;
        this.stat = 0;
        this.rotate = Math.round(Math.random());
        this.objSpeed = 0;
        this.objDirection = 0;
        this.WhichSkillIsActivate = 'none';
        this.struck = false;
        this.score = 0;
        this.regenmp = 0.01;

        if(name == 1){
            this.initWithFile( 'images/Character/Wobuffet/wobuffet.png' );
            this.baseAtk = 0.35;
            this.baseRotateSpeed = 3;
            this.speed = 0.1;
            this.acc = 0; //accerelate
            this.health = 600.9;
            this.Maxhealth = 600;
            this.power = 100;
            this.Maxpower = 100;
            this.character = 1;
            this.skill = [];
            this.skill[0] = 'mirror coat';
            this.skill[1] = 'protect';
            this.skill[2] = 'splash';
        }
        else if(name == 2){
            this.initWithFile( 'images/Character/Venesaur/bulbasaur.png' );
            this.baseAtk = 0.3;
            this.baseRotateSpeed = 3;
            this.speed = 0.1;
            this.acc = 0; //accerelate
            this.health = 600.9;
            this.Maxhealth = 600;
            this.power = 100;
            this.Maxpower = 100;
            this.character = 2;
            this.skill = [];
            this.skill[0] = 'solar beam';
            this.skill[1] = 'vine whip';
            this.skill[2] = 'tackle';
        }
    },

    update: function( dt ) {
    	var pos = this.getPosition();
//------stop
    	if(this.stat == 0 && this.struck == false ){
            //power
            if(this.power < this.Maxpower){
                this.power+=this.regenmp;
            }

    		if(this.rotate == 0){
    			this.setRotation(this.direction);
    			this.direction = this.getRotation()+this.baseRotateSpeed;
    			if(this.direction > 360){
    				this.direction = 0;
    			}
    		}
    		else{
    			this.setRotation(this.direction);
    			this.direction = this.getRotation()-this.baseRotateSpeed;
    			if(this.direction < -360){
    				this.direction = 0;
    			}
    		}
            // this.setRotation(this.getRotation()+this.baseRotateSpeed);
    	}

//------move
    	else if(this.stat == 1 && this.struck == false && this.WhichSkillIsActivate != 'protect'){
            //power//
            if(this.power < this.Maxpower){
                this.power+=0.05;
            }

            //speed//
    		this.setRotation(this.getRotation());
            if(this.speed <= 2.5){
    		    this.speed = this.speed+0.1+(this.acc/2);
            }
            else if(this.speed <= 10){
                this.speed = this.speed+0.3+(this.acc/2);
            }
            else if(this.speed <= 20+(this.acc*10)){
                this.speed = this.speed+1+(this.acc/2);
            }

            //direction//
    		this.theta = this.direction/180*Math.PI;
            this.setPosition(new cc.Point(pos.x + this.speed*Math.sin(this.theta), pos.y + this.speed*Math.cos(this.theta)));
    	}

//------getHit
        else if(this.stat == 2){
            //power
            if(this.power < this.Maxpower){
               this.power+=this.objSpeed*0.2;
            }
            //moveWhenHit
            this.setRotation(this.getRotation());
            var moveAction = cc.MoveTo.create(0.3,cc.p(pos.x + (this.objSpeed*Math.sin(this.objDirection/180*Math.PI))*2.7, pos.y + (this.objSpeed*Math.cos(this.objDirection/180*Math.PI))*2.7));
            this.runAction(moveAction);
            this.stat = 0;
        }

//------Dead
        if(this.health <= 0){
            this.stat = 3;
            this.setRotation(this.getRotation());
            this.WhichSkillIsActivate = 'none';
            if(this.character == 1){
                console.log("player one dead");
            }
            else{
                console.log("player two dead");
            }
        }        

//------Struck
        if(this.struck == true){
            this.setRotation(this.getRotation());
        }
	},
	closeTo: function( obj ) {
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
  		return ( ( Math.abs( myPos.x - oPos.x ) <= 104 ) &&
		( Math.abs( myPos.y - oPos.y ) <= 120 ) );
    },
    afterGetHit: function( obj ){
        if(this.health > 0 && obj.health > 0){
            cc.AudioEngine.getInstance().playEffect( 'effects/Gethit3.m4a' );
            
            cc.AudioEngine.getInstance().playEffect( 'effects/Hit.m4a' );
        }
        this.struck = false;
        this.objDirection = obj.direction;
        this.objSpeed = obj.speed; 
        this.stat = 2;
        //health and IsAlive
        if(this.health > 0){
            if(this.character == 2 ){
                this.health -= (obj.baseAtk * obj.speed)*(obj.baseAtk+1);
            }
            else{
                if(this.WhichSkillIsActivate != 'mirror coat'){
                    this.health -= (obj.baseAtk * obj.speed)*(obj.baseAtk+1);
                }
                else{
                    obj.health -= (obj.baseAtk * obj.speed)*(obj.baseAtk+3);
                    this.health += (obj.baseAtk * obj.speed)*(obj.baseAtk);
                }
            }
        }
        else{
            this.stat = 3; //dead
        }
    },
	Whendown: function(){
		this.stat = 1;
		this.rotate = Math.round(Math.random());
	},
	WhenUp: function(){
		this.stat = 0;
		this.speed = 0.1;
	},
    GetHitBySkill: function( skill, WhoUseSkill ){
        
        cc.AudioEngine.getInstance().playEffect( 'effects/Gethit3.m4a' );
        
        //solar beam
        if(skill == 'solar beam' && this.WhichSkillIsActivate != 'protect'){
            if(this.WhichSkillIsActivate != 'mirror coat'){
                if(this.health > 0){
                    this.health -= ((this.baseAtk+5));
                }
                else{
                    this.stat = 3;
                }
            }
            else{
                if(WhoUseSkill.health > 0){
                    WhoUseSkill.health -= ((WhoUseSkill.baseAtk+5));
                }
                else{
                    WhoUseSkill.stat = 3;
                }
            }
        }

        if(skill == 'vine whip' && this.WhichSkillIsActivate != 'protect'){
            if(this.WhichSkillIsActivate != 'mirror coat'){
                this.health -= 60;
                this.struck = true;
            }
            else{
                WhoUseSkill.health -= 50;
                this.WhichSkillIsActivate = 'none';
            }
        }
    },
    UseSkill: function( skill ){
        this.WhichSkillIsActivate = skill;
    },
    GetBuff: function( buff ){
        this.buff = buff;
    }
    // stat 0 stop and rotate
    // stat 1 move stop rotate
    // stat 2 gethit
    // stat 3 dead
    // stat 4 struck

    // character 1 wobuffet
    // character 2 venesaur
});

