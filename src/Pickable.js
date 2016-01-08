var Pickable = cc.Sprite.extend({
    ctor: function(name) {
        this._super();
        this.item = name;

        if(this.item == 1){
            this.initWithFile( 'images/Pickable/Candy.png' );
            this.plusScore = 1;
            this.plusHealth = 5;
            this.plusPow = 5;
        }
        else if(this.item == 2){
            this.initWithFile( 'images/Pickable/goldCandy.png');
            this.plusScore = 10;
            this.plusHealth = 15;
            this.plusPow = 30;
        }
        else if(this.item == 3){
            this.initWithFile( 'images/Pickable/Carbos.png');
            this.plusScore = 0;
            this.plusHealth = 10;
            this.plusPow = 10;
        }
        else if(this.item == 4){
            this.initWithFile( 'images/Pickable/Hp_Up.png');
            this.plusScore = 0;
            this.plusHealth = 10;
            this.plusPow = 10;
        }
        else if(this.item == 5){
            this.initWithFile( 'images/Pickable/PP_Max.png');
            this.plusScore = 0;
            this.plusHealth = 10;
            this.plusPow = 10;
        }
        else if(this.item == 6){
            this.initWithFile( 'images/Pickable/Protein.png');
            this.plusScore = 0;
            this.plusHealth = 10;
            this.plusPow = 10;
        }
    },
 
    randomPosition: function() {
        this.setPosition( new cc.Point( (Math.random()*700)+250, (Math.random()*350)+150 ) );
    },

    closeTo: function( obj ) {
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
  		return ( ( Math.abs( myPos.x - oPos.x ) <= 59 ) &&
		( Math.abs( myPos.y - oPos.y ) <= 61 ) );
        
    }

    //item = 1 candy
    //item = 2 goldcandy
    //item = 3 Carbos
    //item = 4 Hp_Up
    //item = 5 PP_Max
    //item = 6 Protein
});