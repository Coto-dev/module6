var canvas = document.getElementById("canvas"),
         ctx = canvas.getContext("2d");
         var dots = [],centroidXY=[],minS=[],dotsToCentroid=[],centroidXYBegin=[],step
        ,color = [],sumcentroidsX =[],sumcentroidsY =[],kolvoCenters=[];

        canvas.clear = function() {
            ctx.clearRect(0, 0, 800, 730);
        dots = [],centroidXY = [],minS=[],dotsToCentroid=[],centroidXYBegin=[],step=0
        ,color = [],sumcentroidsX =[],sumcentroidsY =[],kolvoCenters=[];
            ctx.fillStyle = "black";
        }
        canvas.addEventListener('mousedown',function(e){
            var x,y;
            x = e.pageX - this.offsetLeft;
            y = e.pageY - this.offsetTop;
            
            dots.push([x , y])
    
            ctx.beginPath();
            ctx.arc(x , y ,15,0,Math.PI*2);
            ctx.fill();
        });
        function ClusteringKmeans(){
          
            centroidXY = [],
            minS=[],dotsToCentroid=[],
            centroidXYBegin=[],step=0,
            color = [],sumcentroidsX =[],
            sumcentroidsY =[],kolvoCenters=[];
            function getRandomFloat(min, max) {
                return Math.random() * (max - min) + min;
              }

            function getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
              }
        
            var centroid = prompt('Сколь центроидов?',2)
            step = Math.floor(dots.length/centroid);
           
           // console.log(typeof(dots));
            for (let i=0,j=0;i<dots.length;i+=step){
                var x,y,h=[];
                x=dots[i][0];
                y=dots[i][1];
                centroidXY.push([x,y]);
            }
            //console.log(centroidXY);
           // console.log(dots);
          
        // for (let i=0;i<centroid;i++){
        //     var x,y;
        //     x=getRandomFloat(1, 800);
        //     y=getRandomFloat(1, 730);
           
        //     centroidXY.push([x,y]);
                    
        // }    
            for(let i = 0;i<centroid;i++){
                color[i]=getRandomColor();
            }
            var count=0;
           minS = [],dotsToCentroid=[];
           while (count<7){
               
            centroidXYBegin = centroidXY;
            
            for (let i=0;i<dots.length;i++){ // проходим по всем точкам
                var s=0, min=10000;

                for (let j=0;j<centroid;j++){ // ищем расстояние между центрами и точками
                    var x,y;
                    x=centroidXY[j][0];
                    y=centroidXY[j][1];
                        s=Math.sqrt(((x-dots[i][0])**2) + ((y-dots[i][1])**2));
                       
                        if (s<min){
                            min = Math.min(min,s);
                            minS[i]=min;
                            dotsToCentroid[i]=j;
                        }

                    }
                   
            }
            // function sleep(milliseconds) {
            //     const date = Date.now();
            //     let currentDate = null;
            //     do {
            //       currentDate = Date.now();
            //     } while (currentDate - date < milliseconds);
            //   }
            // sleep(2000);
            for (let index=0;index<dotsToCentroid.length;index++){
                sumcentroidsX[index]=0;
                sumcentroidsY[index]=0;
                kolvoCenters[index]=0;
                }
            for (let h=0;h<dotsToCentroid.length;h++){
                     ctx.beginPath();
                     ctx.fillStyle = color[dotsToCentroid[h]];
                     ctx.arc(dots[h][0] , dots[h][1] ,15,0,Math.PI*2);
                     ctx.fill();
                sumcentroidsX[dotsToCentroid[h]]+=dots[h][0];
                sumcentroidsY[dotsToCentroid[h]]+=dots[h][1];
                kolvoCenters[dotsToCentroid[h]]++;
            }
            for (let h=0;h<centroidXY.length;h++){
                centroidXY[h][0]=sumcentroidsX[h]/kolvoCenters[h];
                centroidXY[h][1]=sumcentroidsY[h]/kolvoCenters[h];
                // ctx.beginPath();
                    //  ctx.fillStyle = color[dotsToCentroid[h]];
                    //  ctx.arc(centroidXY[h][0] , centroidXY[h][1] ,30,0,Math.PI*2);
                    //  ctx.fill();
                console.log(sumcentroidsX[h]/kolvoCenters[h]);
            }
        
            
            
                
            count++;
        }
        }


      
            