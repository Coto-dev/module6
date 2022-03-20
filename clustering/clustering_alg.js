var canvas = document.getElementById("canvas"),
         ctx = canvas.getContext("2d");
         var mouse = { x:0, y:0},
        dots = [],centroidXY = [],minS=[],dotsToCentroid=[],centroidXYBegin=[];
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
            var centroid = prompt('Сколь центроидов?',2)
            for (let i=0;i<centroid;i++){
                centroidXY[i]=dots[i];
            }
           minS = [],dotsToCentroid=[];
           while (centroidXYBegin != centroidXY){
            centroidXYBegin = centroidXY;
            for (let i=0;i<dots.length;i++){ // проходим по всем точкам
                var s=0, min=10000;
               // alert(s);
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
                var sumx0=0,sumy0=0 ,c0=0;
                var sumx1=0,sumy1=0,c1=0;
                if (dotsToCentroid[h]==0){
                     ctx.beginPath();
                     ctx.fillStyle = "orange";
                     ctx.arc(dots[h][0] , dots[h][1] ,15,0,Math.PI*2);
                     ctx.fill();
                     
                     sumx0 += dots[h][0];sumy0 += dots[h][1];c0++;
                }
                if (dotsToCentroid[h]==1){
                    ctx.beginPath();
                    ctx.fillStyle = "red";
                    ctx.arc(dots[h][0] , dots[h][1] ,15,0,Math.PI*2);
                    ctx.fill();
                    
                     sumx1 += dots[h][0];sumy1 += dots[h][1];
                     c1++;
               }
            //     console.log(sumx0,c0);
            //    centroidXY[0][0] = sumx0/c0;
            // centroidXY[0][1] = sumy0/c0;
            // centroidXY[1][0] = sumx1/c1;
            // centroidXY[1][1] = sumy1/c1;
            // }
            }
            // console.log(centroidXY);
           // var newcentroid1,newcentroid2;
            
            
                
            
        }
        }


      
            