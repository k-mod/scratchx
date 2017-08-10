(function(ext) {
    ext.pi_url = 'http://192.168.1.74:8000';
    ext.pi_userpass = 'webiopi:raspberry';
    ext.empty_post = function(url) {
	      $.ajax({
              type:'POST',
              url: url,
              data: { },
              headers: {
	    	    'Authorization': 'Basic ' + btoa(ext.pi_userpass)
	          },
	          error: function(err) { 
	    	    alert (err); 
	          }
        });
    };
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.set_lcd = function(t) {
	ext.empty_post(ext.pi_url + '/macros/lcd_display/' + t);
    };
    
    ext.move_forward = function() {
	ext.empty_post(ext.pi_url + '/macros/go_forward/');
    };
	
    ext.move_backward = function() {
	ext.empty_post(ext.pi_url + '/macros/go_backward/');
    };
    ext.turn_left = function() {
	ext.empty_post(ext.pi_url + '/macros/bear_left/');
    };
	
   ext.turn_right = function() {
	ext.empty_post(ext.pi_url + '/macros/bear_right/');
    };

    ext.stop = function() {
	ext.empty_post(ext.pi_url + '/macros/stop/');
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'Display %s on LCD', 'set_lcd'],
	    [' ', 'Stop', 'stop'],
		[' ', 'Move Forward', 'move_forward'],
		[' ', 'Move Backward', 'move_backward'],
		[' ', 'Turn Left', 'turn_left'],
		[' ', 'Turn Right', 'turn_right'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('My Bot Extensions', descriptor, ext);
})({});
