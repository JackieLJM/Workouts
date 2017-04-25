var Site = {
	init: function() {
		if ( $('liquid') )    Liquid.parseLiquids();
		if ( $('folioMenu') ) Folio.init();
		if ( $('portfolioGallery') )
		{
			$('myGallery').setStyle('height', '350px');
            var myGallery = new gallery($('myGallery'), {
					timed: false,
        			showArrows: true,
        			showCarousel: true,
        			embedLinks: true,
        			showInfopane: false
				});
		}
		if ( $('contact') )
		{
			ContactForm.init();
		}
		if( $('GMap') )
		{
			window.addEvent( 'onunload', GUnload );
			GoogleMapsAPM.init();
		}
	}
};

var Liquid = {

	parseLiquids: function(){
		var liquids = $$('#liquid .liquid');
		var fx = new Fx.Elements(liquids, {wait: false, duration: 800, transition: Fx.Transitions.elasticOut});
		liquids.each(function(liquid, i)
		{
			liquid.addEvent('mouseover', function(e)
			{
				e = new Event(e).stop();
				var obj = {};
				obj[i] = { 'width': [liquid.getStyle('width').toInt(), 280] };

				liquids.each(function(other, j)
				{
					if (other != liquid)
					{
						var w = other.getStyle('width').toInt();
						if (w != 125) obj[j] = {'width': [w, 125]};
					}
				});
				fx.start(obj);
			});
		});

		document.addEvent('mouseover', function(e){
			e = new Event(e);
			var rel = e.relatedTarget;
			if (!rel) return;
			if (rel.hasClass && (rel.hasClass('liquids') || rel.hasClass('liquid') || rel.id == 'liquid')){
				var obj = {};
				liquids.each(function(other, j){
					obj[j] = {'width': [other.getStyle('width').toInt(), 178]};
				});
				fx.start(obj);
			};
		});
	}
};

var Folio =
	{
		init: function()
		{
			Folio.parseItems();
		},

		parseItems: function()
		{
			var first = true;
			var items = $$('#folioMenu .folioItem');
			var fx = new Fx.Elements(items, {wait: false, duration: 300, transition: Fx.Transitions.quadInOut});
			items.each( function( fitem, i)
			{
				var myFx = new Fx.Style(fitem, 'opacity').set(1);

				fitem.addEvent('mouseover', function(e)
				{
					e = new Event(e).stop();
					var obj = {};
					if( fitem.getStyle('opacity') != 0.5 )
					{
						obj[i] = { 'opacity': [1, 0.5] };
					}

					items.each( function( other, j)
					{
						if( other != fitem )
						{
							if( other.getStyle('opacity') != 1 )
							{
								obj[j] = {'opacity': [other.getStyle('opacity'), 1]};
							}
						}
					});
					fx.start(obj);
				});

				fitem.addEvent('mouseout', function(e)
				{
					e = new Event(e).stop();
					var obj = {};

					items.each( function( other, j)
					{
							if( other.getStyle('opacity') != 1 )
							{
								obj[j] = {'opacity': [other.getStyle('opacity'), 1]};
							}
					});
					fx.start(obj);
				});
			});

		}
	};

var ContactForm = 
	{
		init: function()
		{
			$('name').addEvent( 'focus', ContactForm.Clear );
			$('company').addEvent( 'focus', ContactForm.Clear );
			$('email_address').addEvent( 'focus', ContactForm.Clear );
			$('telephone').addEvent( 'focus', ContactForm.Clear );
			$('query').addEvent( 'focus', ContactForm.Clear );
		},
		
		Clear: function( e )
		{
			var evt = new Event( e );
			
			switch( evt.target.name )
			{
				case 'name':
					if( evt.target.value == 'Your Name' ) { evt.target.value=''; }
					break;
				case 'company':
					if( evt.target.value == 'Your Company' ) { evt.target.value=''; }
					break;
				case 'email_address':
					if( evt.target.value == 'Your Email Address' ) { evt.target.value=''; }
					break;
				case 'telephone':
					if( evt.target.value == 'Your Telephone Number' ) { evt.target.value=''; }
					break;
				case 'query':
					if( evt.target.value == 'Your Enquiry' ) { evt.target.value=''; }
					break;
			}
		}
	};
	
var GoogleMapsAPM =
{
	init: function()
	{
		if (GBrowserIsCompatible()) 
		{
        	var map = new GMap2( $('GMap') );
			map.addControl(new GSmallMapControl());
			map.setCenter(new GLatLng(52.078181, -2.635477), 15);
		
			// Our info window content
			var infoTabs = [
		  		new GInfoWindowTab("Address", '<div id="GMapAddress"><h4>allpaymedia</h4>Whitestone Business Park<br />Whitestone<br />Hereford HR1 3SE<br /></div>'),
		  		new GInfoWindowTab("Directions", '<div id="GMapDirections">On entering Whitestone Business Park\'s main entrance, bear left and, after approximately 200m, you will see the allpay.net building with client parking at the front.')
				];
		
			// Place a marker in the center of the map and open the info window
			// automatically
			var marker = new GMarker(map.getCenter());
			GEvent.addListener(marker, "click", function() {
			  marker.openInfoWindowTabsHtml(infoTabs);
			});
			map.addOverlay( marker );
			marker.openInfoWindowTabsHtml(infoTabs);
      	}
	}
};
window.onDomReady(Site.init);