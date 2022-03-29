var canvas = document.getElementById("canvas"),
         ctx = canvas.getContext("2d");
         var dots = [],centroidXY=[],dotsToCentroid=[],centroidXYBegin=[],step
        ,color = [],sumcentroidsX =[],sumcentroidsY =[],kolvoCenters=[];

        canvas.clear = function() {
            ctx.clearRect(0, 0, 800, 730);
        dots = [],centroidXY = [],minS=[],dotsToCentroid=[],centroidXYBegin=[],step=0
        ,color = [],sumcentroidsX =[],sumcentroidsY =[],kolvoCenters=[];
        clusters = [],sumX=0,sumY=0,centroids=[];
         minn=500,constI=[],constJ=[];
         h=[],container=[[]];
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

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }

          function getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
          }

        //   function delay(delayInms) {
        //     return new Promise(resolve => {
        //     setTimeout(() => {
        //     resolve(2);
        //     }, delayInms);
        //     });
        //     }

        function ClusteringKmeans(centroid){
            centroidXY = [],
            dotsToCentroid=[],
            centroidXYBegin=[],step=0,
            color = [],sumcentroidsX =[],
            sumcentroidsY =[],kolvoCenters=[];
            if (centroid==0)
             centroid = prompt('Сколь центроидов?',2)
            if (dots.length < centroid){
                alert('Ошибка');
                canvas.clear();
                
            }
            else {
            step = Math.floor(dots.length/centroid);

            for (let i=0,j=0;i<dots.length;i+=step){
                var x,y;
                x=dots[i][0];
                y=dots[i][1];
                centroidXY.push([x,y]);
            }
             
            for(let i = 0;i<centroid;i++){
                color[i]=getRandomColor();
            }
            var count=0;
          dotsToCentroid=[];
           while (count<7){
               
            centroidXYBegin = centroidXY;
            console.log(centroidXYBegin);
            console.log(centroidXY);
            for (let i=0;i<dots.length;i++){ // проходим по всем точкам
                var s=0, min=10000;

                for (let j=0;j<centroid;j++){ // ищем расстояние между центрами и точками
                    var x,y;
                    x=centroidXY[j][0];
                    y=centroidXY[j][1];
                        s=Math.sqrt(((x-dots[i][0])**2) + ((y-dots[i][1])**2));
                       
                        if (s<min){
                            min = Math.min(min,s);
                            dotsToCentroid[i]=j;
                        }

                    }
                   
            }
        
            
            for (let index=0;index<dotsToCentroid.length;index++){
                sumcentroidsX[index]=0;
                sumcentroidsY[index]=0;
                kolvoCenters[index]=0;
                }
               // await delay(1000);
               // ctx.clearRect(0, 0, 800, 730);
            for (let h=0;h<dotsToCentroid.length;h++){
               
                     ctx.beginPath();
                     ctx.fillStyle = color[dotsToCentroid[h]];
                     ctx.arc(dots[h][0] , dots[h][1] ,20,0,Math.PI*2);
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
                
            }
        
            
            
                
            count++;
             }
          }
          
        }
       
                    
        
        function ClusteringHierarchical(centroid){
            var clusters = [],sumX=0,sumY=0,centroids=[];
            var minn=1000,constI,constJ,count=0;
            var h=[],container=[[]];
            if (centroid==0)
             centroid = prompt('Сколь центроидов?',2);
             if (dots.length < centroid){
                alert('Ошибка');
                canvas.clear();
                
            }
            for(let i = 0;i<dots.length;i++){
                color[i]=getRandomColor();
            }
            for (let i=0,j=0;i<dots.length;i++){
                var x,y;
                x=dots[i][0];
                y=dots[i][1];
                clusters.push([x,y]);
            }
            for (let i=0;i<dots.length;i++){
            
                container[i,i]=[i];
            }
            count = container.length;
            while(count!=centroid){
                count=0;
                console.log('clusters.length',clusters.length);
                console.log('clusters',clusters)
          minn = 10000;
            for (let i=0;i<clusters.length;i++){
                var s=0, x,y;
                for (let j=0;j<clusters.length;j++){
                    if (i!=j && clusters[i]!=undefined && clusters[j]!=undefined){
                    x=clusters[j][0];
                    y=clusters[j][1];
                s=Math.sqrt(((x-clusters[i][0])**2) + ((y-clusters[i][1])**2));
                if (s<minn){
                    minn= Math.min(minn,s);
                  // console.log(minn);
                    constI = i;
                    constJ = j;
                             }
                         }
                     }  
                    
                }
                
                //    h.push(container[constI]);
                //     console.log('container[constI] ',container[constI]);

                //     h.push(container[constJ]);
                //     console.log('container[constJ] ',container[constJ]);
                
                for (let i=0;i<container[constI].length;i++){
                    h.push(container[constI][i]);
                    console.log('container[constI][i] ',container[constI][i]);
                }
                for (let i=0;i<container[constJ].length;i++){
                    h.push(container[constJ][i]);
                    console.log('container[constJ][i] ',container[constJ][i]);
                }
             
                //delete container[constI];
                delete container[constJ];
                container[constI]=h;
                
                sumX=0;
                sumY=0;
                kolvoCenters = 0;
                for (let i=0;i<container[constI].length;i++){
                    ctx.beginPath();
                    //  ctx.fillStyle = color[constI];
                    //  ctx.arc(dots[container[constI][i]][0] , dots[container[constI][i]][1] ,25,0,Math.PI*2);
                    //  ctx.fill();
                    ctx.lineWidth = 15;
                    ctx.strokeStyle = color[constI];
                    ctx.arc(dots[container[constI][i]][0] , dots[container[constI][i]][1] ,20,0,Math.PI*2);
                    ctx.stroke();
                    //ctx.fill();
                    sumX+=dots[container[constI][i]][0];
                    sumY+=dots[container[constI][i]][1];
                    kolvoCenters++;
                }
                clusters[constI][0] = sumX/kolvoCenters;
                clusters[constI][1] = sumY/kolvoCenters;


                

                delete clusters[constJ];
              // console.log('cluster ',clusters);
               console.log('container ',container);
              // console.log('h ',h);
               h=[];
              // console.log('h ',h);
              //clusters.length--;
              //container.length--;
              for (let i=0;i<container.length;i++){
                  if (container[i]!=undefined)
               count++;
              }
            }
            
             
        }
        function match(){
           var centroid = prompt('Сколь центроидов?',2)
            ClusteringHierarchical(centroid);
            ClusteringKmeans(centroid);
        }
       
        
      
            