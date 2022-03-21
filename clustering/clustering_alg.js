var canvas = document.getElementById("canvas"),
         ctx = canvas.getContext("2d");
         var mouse = { x:0, y:0},
        dots = [],centroidXY = [],minS=[],dotsToCentroid=[],centroidXYBegin=[],step=0
        ,color = [],sumcentroidsX =[],sumcentroidsY =[],kolvoCenters=[];
        canvas.clear = function() {
            ctx.clearRect(0, 0, 800, 730);
            dots = [];
            centroidXY= [];
            centroid =[];
            minS=[];
            ctx.fillStyle = "black";

            
        }
        canvas.addEventListener('mousedown',function(e){
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            dots.push([mouse.x , mouse.y])
            ctx.beginPath();
            ctx.arc(mouse.x , mouse.y ,15,0,Math.PI*2);
            ctx.fill();
        });
        function ClusteringKmeans(){

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
            for (let i=0,j=0;i<dots.length;i+=step){
                centroidXY[j]=dots[i];
                j++;
            }
        // for (let i=0;i<centroid;i++){
        //     centroidXY[i][0]=getRandomFloat(1, 700);
        //     centroidXY[i][1]=getRandomFloat(1, 700);
        // }
    
            console.log( centroidXY);
       
            for(let i = 0;i<centroid;i++){
                color[i]=getRandomColor();
            }

           minS = [],dotsToCentroid=[];
           while (centroidXYBegin != centroidXY){
            centroidXYBegin = centroidXY;
            for (let i=0;i<dots.length;i++){ // проходим по всем точкам
                var s=0, min=10000;

                for (let j=0;j<centroid;j++){ // ищем расстояние между центрами и точками
                        s=Math.sqrt(((centroidXY[j][0]-dots[i][0])**2) + ((centroidXY[j][1]-dots[i][1])**2));
                       
                        if (s<min){
                            min = Math.min(min,s);
                            minS[i]=min;
                            dotsToCentroid[i]=j;
                        }

                    }
                   
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
            for (let h=0;h<centroid.length;h++){
                centroidXY[h][0]=sumcentroidsX[h]/kolvoCenters[h];
                centroidXY[h][1]=sumcentroidsY[h]/kolvoCenters[h];
                // console.log( centroidXY[h][0]);
                // console.log( centroidXY[h][1]);
                // console.log(h);

            }
            
            
            
                
            
        }
        }


      
            