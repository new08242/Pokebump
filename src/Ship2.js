var Ship2 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/bulbasaur.png' );
        this.direction = 0;
        this.stat = 0;
        this.rotate = Math.round(Math.random());
        this.speed = 1;
        this.objSpeed = 0;
        this.objDirection = 0;
        this.health = 100;
        //this.v=0.3;
    },
    update: function( dt ) {
    	var pos = this.getPosition();
    	//console.log(this.direction);
    	if(this.stat == 0){ 
    		if(this.rotate == 0){
    			this.setRotation(this.direction);
    			this.direction = this.getRotation()+3;
    			if(this.direction > 360){
    				this.direction = 0;
    			}
    		}
    		else{
    			this.setRotation(this.direction);
    			this.direction = this.getRotation()-3;
    			if(this.direction < -360){
    				this.direction = 0;
    			}
    		}
    	}
        else if(this.stat == 2){ //if get hit
            this.setRotation(this.getRotation());
            this.setPosition(new cc.Point(pos.x + (this.objSpeed*Math.sin(this.objDirection/180*Math.PI))*1.2, pos.y + (this.objSpeed*Math.cos(this.objDirection/180*Math.PI))*1.2));
            this.stat = 0;
        }
    	else{
    		this.setRotation(this.getRotation());
    		this.speed = this.speed+0.4;
    		if(this.direction < 0){
    			this.direction = 360 + this.direction;
    		}
    		
    		if(this.direction >= 0 && this.direction <= 90){
    			this.setPosition(new cc.Point(pos.x + Math.abs(this.speed*Math.sin(this.direction/180*Math.PI)), pos.y + Math.abs(this.speed*Math.cos(this.direction/180*Math.PI))));
    		}
    		
    		else if(this.direction > 90 && this.direction <= 180){
    			this.setPosition(new cc.Point(pos.x + Math.abs(this.speed*Math.sin(this.direction/180*Math.PI)), pos.y - Math.abs(this.speed*Math.cos(this.direction/180*Math.PI))));
    		}
    		
    		else if(this.direction > 180 && this.direction <= 270){
    			this.setPosition(new cc.Point(pos.x - Math.abs(this.speed*Math.sin(this.direction/180*Math.PI)), pos.y - Math.abs(this.speed*Math.cos(this.direction/180*Math.PI))));
    		}
    		
    		else if(this.direction > 270 && this.direction <= 360 ){
    			this.setPosition(new cc.Point(pos.x - Math.abs(this.speed*Math.sin(this.direction/180*Math.PI)), pos.y + Math.abs(this.speed*Math.cos(this.direction/180*Math.PI))));
    		}
    		
    		
    	}
	},
    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ( ( Math.abs( myPos.x - oPos.x ) <= 95 ) &&
        ( Math.abs( myPos.y - oPos.y ) <= 107 ) );
        
    },
    afterGetHit: function( obj ){
        this.objDirection = obj.direction;
        this.objSpeed = obj.speed; 
        this.stat = 2;
        this.health-= (1.2*obj.speed);
    },
	Whendown2: function(){
		this.stat = 1;
		this.rotate = Math.round(Math.random());
	},
	WhenUp2: function(){
		this.stat = 0;
		this.speed = 0.1;
        //this.v*=-1;
	}
    // stat 0 stop and rotate
    // stat 1 move stop rotate
    // stat 2 gethit
    // stat 3 dead
});