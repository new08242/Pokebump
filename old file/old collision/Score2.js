var scoreLabel2 = cc.LabelTTF.extend({
	ctor: function() {
        this._super();
        this.setPosition( new cc.Point( 100, 300 ) );
        this.score2 = 0;
    },
    update: function(){
    	this.setString( this.score2 );
    },
    plusScore2: function(){
        this.score2 = this.score2+1;
    }
});