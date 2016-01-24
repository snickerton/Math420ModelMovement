$(function(){

  var canvas, ctx, cWidth, cHeight;

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  cWidth = canvas.width;
  cHeight = canvas.height;

  var inputEq = $('#inputEquation');
  var inputFPS = $('#inputFPS');
  var output = $("#outputP");
  var domainLower = $("#domainLower");
  var domainUpper = $("#domainUpper");

  var equation = Parser.parse(inputEq.val());
  //How quickly to step through x
  var FPS = parseInt(inputFPS.val());
  var showGraph = false;

  //how to modulate x
  var dLower = parseInt(domainLower.val());
  var dUpper = parseInt(domainUpper.val());

  //stepCount for game loop
  var sC = 0;

  //Update/reset values
  $("button").click(function(){
      equation = Parser.parse(inputEq.val());
      FPS = parseInt(inputFPS.val());

      dLower = parseInt(domainLower.val());
      dUpper = parseInt(domainUpper.val());

      sC=0;


      output.text();

  });//EOclick

  //if show graph is checked
  $('#graphCheckbox').change(function(){
    if(this.checked){
      showGraph = true;
    }
    else{
      showGraph = false;
    }
    //clear everything
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,cWidth, cHeight);
  });


    setInterval(function(){

      //have step count be within bounds of domain
      //the number 4 here is to increase steps per second and create smoother motion
      var n = (sC/4)%(dUpper-dLower+1);

      node = new Object();

      //position = stepcount in domain

      if(!showGraph){
        node.x = cWidth/2;
      }
      if(showGraph){
        node.x = sC%cWidth
      }
      node.y = cHeight*(3/4)-20-equation.evaluate({x: dLower+(n)});

      node.width = 5;

      if(!showGraph){
        //clear canvas
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,cWidth, cHeight);
      }

      //Draw node
      ctx.fillStyle = "#FFF";
      //no border
      ctx.strokeStyle="#FFF";
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.width, 0, 2*Math.PI);
      //Make it white
      ctx.fill();
      ctx.stroke();

      sC++;
      output.html("Equation: "+equation.toString()+" FPS: "+FPS+"<br/> Domain: " + dLower + ", " + dUpper+" Position: "+node.x+", "+node.y+" );

    }, 1000/FPS)//EOInterval

//  }//EOgame



})//EOMain
