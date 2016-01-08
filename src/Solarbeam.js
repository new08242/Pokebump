var Solarbeam = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile('images/Skill effect/solar beam/Solarbeam effect2.png');
	},

	// closeTo: function( obj,user ) {
	// 	var myPos = this.getPosition();
	// 	var oPos = obj.getPosition();
 //  		return ( ( Math.abs( myPos.x - oPos.x ) <= 50*Math.cos(user.direction/Math.PI*180) ) &&
	// 	( Math.abs( myPos.y - oPos.y ) <= 500*Math.sin(user.direction/Math.PI*180) ) );
 //    }
});