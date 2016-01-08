var VineTip = cc.Sprite.extend({
	ctor: function( Dir) {
		this.direction = Dir;
		this._super();
		this.initWithFile('images/Skill effect/vine whip/vineWhipTip.png');
	},
});