
var initialCats = [
        {
            clickCount: 0,
            name: 'Tommy',
            imgSrc: 'cat_picture1.jpg'
        },
        {
            clickCount: 0,
            name: 'naughty',
            imgSrc: 'cat_picture2.jpg'
        },
        {
            clickCount: 0,
            name: 'Scary',
            imgSrc: 'cat_picture3.jpg'
        },
        {
            clickCount: 0,
            name: 'cutie',
            imgSrc: 'cat_picture4.jpg'
        },
        {
            clickCount: 0,
            name: 'Sleepy',
            imgSrc: 'cat_picture5.jpg'
        }
    ];
    var cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc =ko.observable(data.imgSrc);

  this.title = ko.computed( function() {
    var title;
    var clicks = this.clickCount();
    if (clicks < 10) {
      title = 'NewBorn';
    }
    else if (clicks < 15) {
      title = 'Infant';
    }
    else if (clicks < 20){
      title = 'Child';
    }
    else if (clicks < 25){
      title = 'Adult';
    }
    else {
      title = 'Ninja';
    }

    return title;
  }, this);
}
var viewModel = function() {
    var self=this;
    
    this.catList = ko.observableArray([]);
    initialCats.forEach(function(catItem){
        self.catList.push( new cat(catItem));
        
        
    });
     this.currentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function(){
      self.currentCat().clickCount(self.currentCat().clickCount() + 1); 
    };
    
    this.setCat= function(clickedCat){
        self.currentCat(clickedCat);
  };
};

ko.applyBindings(new viewModel());

