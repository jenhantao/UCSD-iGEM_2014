$(function(){ // on dom ready

// photos from flickr with creative commons license
  
$('#cy').cytoscape({
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 80,
        'width': 80,
        'background-fit': 'cover',
        'border-color': '#000',
        'border-width': 3,
        'border-opacity': 0.5
      })
    .selector('.eating')
      .css({
        'border-color': 'red'
      })
    .selector('.eater')
      .css({
        'border-width': 9
      })
    .selector('edge')
      .css({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa'
      })
    .selector('#bird')
      .css({
        'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
      })
    .selector('#cat')
      .css({
        'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
      })
    .selector('#ladybug')
      .css({
        'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
      })
  .selector('#aphid')
      .css({
        'background-image': 'https://farm9.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
      })
  .selector('#rose')
      .css({
        'background-image': 'https://farm6.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
      })
  .selector('#grasshopper')
      .css({
        'background-image': 'https://farm7.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
      })
  .selector('#plant')
      .css({
        'background-image': 'https://farm1.staticflickr.com/231/524893064_f49a4d1d10_z.jpg'
      })
  .selector('#wheat')
      .css({
        'background-image': 'https://farm3.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
      })
  .selector('#bunny')
      .css({
        'background-image': 'http://images5.fanpop.com/image/photos/30600000/Bunny-bunny-rabbits-30657027-539-366.jpg'
      }),
  
  elements: {
    nodes: [
      { data: { id: 'cat' } },
      { data: { id: 'bird' } },
      { data: { id: 'ladybug' } },
      { data: { id: 'aphid' } },
      { data: { id: 'rose' } },
      { data: { id: 'grasshopper' } },
      { data: { id: 'plant' } },
      { data: { id: 'wheat' } },
      
    ],
    edges: [
      { data: { source: 'cat', target: 'bird' } },
      { data: { source: 'bird', target: 'ladybug' } },
      { data: { source: 'bird', target: 'grasshopper' } },
      { data: { source: 'grasshopper', target: 'plant' } },
      { data: { source: 'grasshopper', target: 'wheat' } },
      { data: { source: 'ladybug', target: 'aphid' } },
      { data: { source: 'aphid', target: 'rose' } },
    
    ]
  },
  
  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  },
  
  ready: function(){
    window.cy = this;
    
    cy.on('tap', 'node', function(){
      var nodes = this;
      var tapped = nodes;
      var food = [];
      
      nodes.addClass('eater');
      
      for(;;){
        var connectedEdges = nodes.connectedEdges(function(){
          return !this.target().anySame( nodes );
        });
        
        var connectedNodes = connectedEdges.targets();
        
        Array.prototype.push.apply( food, connectedNodes );
        
        nodes = connectedNodes;
        
        if( nodes.empty() ){ break; }
      }
            
      var delay = 0;
      var duration = 500;
      for( var i = food.length - 1; i >= 0; i-- ){ (function(){
        var thisFood = food[i];
        var eater = thisFood.connectedEdges(function(){
          return this.target().same(thisFood);
        }).source();
                
        thisFood.delay( delay, function(){
          eater.addClass('eating');
        } ).animate({
          position: eater.position(),
          css: {
            'width': 10,
            'height': 10,
            'border-width': 0,
            'opacity': 0
          }
        }, {
          duration: duration,
          complete: function(){
            thisFood.remove();
          }
        });
        
        delay += duration;
      })(); } // for
      
    }); // on tap
    
  } // on ready
}); // cy init
    //test button to add elements to cytoscape
    $('#btnC').click(function(){
        cy.add([
            {group: 'nodes', data: {id:'bunny'}, renderedPosition: {x: 200, y: 200}},
<<<<<<< HEAD
            {group: 'edges', data: {source: 'bunny', target: 'cat'}}                
=======
            {group: 'edges', data: {source: 'bunny', target: 'cat'}},    
>>>>>>> 9b2911c0a8bbd033ec9ba57aa44ae8360458298f
        ]);
        alert("node added");
    });
}); // on dom ready