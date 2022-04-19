
    $('#Erosion').on('click', function(){
      var carddeck = [];
      var startX = 98;
      var startY = 291;

      let src = cv.imread('canvas');
      let template = cv.imread('template');
      let templatename = document.querySelector('#template').getAttribute('name');
      let dst = new cv.Mat();
      let mask = new cv.Mat();
      let rect = new cv.Rect(0,0,0,0);

      //let low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
      //let high = new cv.Mat(src.rows, src.cols, src.type(), [122, 122, 121, 255]);
      //cv.inRange(src, low, high, dst);
      //let inRangeDst = dst;
            
      deckrow = 4;
      for (var i = 0; i < deckrow; i++) {
        
        y = startY + (i * 182);
        for (var j = 0; j < 10; j++) {
          if(((i*10) + j) == 40){
            break;
          }
          x = startX + (j * 118);
          rect = new cv.Rect(x, y, 116, 164);
          source = src.roi(rect);

          var method  =   cv.TM_CCORR_NORMED;

          let result_cols =   source.cols - template.cols + 1;
          let result_rows =   source.rows - template.rows + 1;

          var result      =   new cv.Mat(result_rows, result_rows, cv.CV_32FC1);

          cv.matchTemplate(source, template, result, method, mask);

          cv.normalize(result, result, 0, 1, cv.NORM_MINMAX, -1, new cv.Mat() );

          let minMaxLoc   =   cv.minMaxLoc(result);

          let matchLoc;

          if(method == cv.TM_SQDIFF || method == cv.TM_SQDIFF_NORMED){
              matchLoc    =   minMaxLoc.minLoc;
          }else{
              matchLoc    =   minMaxLoc.maxLoc;
          }

          let canvas  =   document.createElement("canvas");
          canvas.id = `canvas${i}${j}`

          var output  =   new cv.Mat();
          source.copyTo(output);

          let point1 = new cv.Point(matchLoc.x, matchLoc.y);
          let point2 = new cv.Point(matchLoc.x + template.cols, matchLoc.y + template.rows);

          let color = new cv.Scalar(255, 0, 0, 255);
          cv.rectangle(output, point1, point2, color, 2, cv.LINE_AA, 0);

          cv.imshow(canvas, output);
          document.querySelector('#canvaszone').appendChild(canvas);

          if(matchLoc.x == 38 && matchLoc.y == 38){
            for (var l = 5; l > 0; l--) {
                console.log((92 - (Math.abs(l-5) * 15)));
                console.log(source.ucharAt(137, (92 - (Math.abs(l-5) * 15)) * dst.channels()))
                if(dst.ucharAt(137, (92 - (Math.abs(k-5) * 15)) * dst.channels()) > 100){
                    detailcarddeck[carddeck[parseInt(String(i)+String(j))]] = k;
                    k=0;
                }else if(k==1){
                    detailcarddeck[carddeck[parseInt(String(i)+String(j))]] = 0;
                }
            }
            carddeck.push(templatename);
          }
        }
      }
      
      console.log(carddeck)
      
      mask.delete();
      src.delete();
      dst.delete();
      output.delete();
    })