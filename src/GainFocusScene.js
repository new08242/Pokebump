var GainFocusLayer = cc.LayerColor.extend({
  ctor: function(){
		this._super();
  },
  init: function() {
    this.setKeyboardEnabled( true );

		return true;
  },
  onKeyDown: function( e ) {
    if ( e == cc.KEY.up ) {
      cc.AudioEngine.getInstance().playEffect( 'effects/Click2.m4a' );
      
      cc.AudioEngine.getInstance().stopMusic();
      var director = cc.Director.getInstance();
      director.replaceScene(cc.TransitionFade.create(1.5, new StartmenuScene()));
    }
  },
  update: function() {}
});

var GainFocusScene = cc.Scene.extend({
  ctor: function (){
    this._super();
    var layer = new GainFocusLayer();
    layer.init();
    this.addChild(layer);
  }
});
  