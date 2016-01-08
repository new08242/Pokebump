var scoreLabel = cc.LabelTTF.extend({
	ctor: function() {
        this._super();
        this.setPosition( new cc.Point( 950, 300 ) );
        this.score1 = 0;
    },
    update: function(){
    	this.setString( this.score1 );
    },
    plusScore: function(){
        this.score1 = this.score1+1;
    }
});