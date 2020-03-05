var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');//获取canvas上下文
var width = ctx.canvas.width;//画布宽
var height = ctx.canvas.height;//画布高
var r = width/2;//半径
var rem = width / 200;//缩放比例

function drawBackground(){//画圆
    ctx.save();
    //transalte，重新映射画布上的(0,0)位置
    ctx.translate(r,r);//定到圆中心
    ctx.beginPath();//画起始一条路径
    ctx.lineWidth = 10*rem;//线条宽度
    ctx.arc(0,0,r - ctx.lineWidth/2,0,2*Math.PI,false);//画圆，顺时针
    ctx.stroke();//画圆的路径
    
    var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];//定义小时数，画线是从x正轴开始，所以先是3
    ctx.font = 18*rem+'px Arial';//设置文本字体大小
    ctx.textAlign = 'center';//设置文本对齐方式
    ctx.textBaseline = 'middle';//设置当前文本基线
    hourNumbers.forEach((number,i)=>{
        let rad = 2*Math.PI/12*i;//算出每小时弧度
        let x = Math.cos(rad)*(r - 30*rem);//cos度是x临边比r斜边
        let y = Math.sin(rad)*(r - 30*rem);//sin度是y对边比r斜边
        ctx.fillText(number,x,y);//绘制文本
    });

    for(let i = 0;i < 60;i++){
        let rad = 2*Math.PI / 60 * i;//每秒的弧度
        let x = Math.cos(rad)*(r - 18*rem);//cos度是x临边比r斜边
        let y = Math.sin(rad)*(r - 18*rem);//sin度是y对边比r斜边
        ctx.beginPath();//开始画
        if(i % 5 === 0){//小时数，圆点颜色判断
            ctx.fillStyle = '#000';//填充颜色
            ctx.arc(x,y,2*rem,0,2*Math.PI,false);//画每一个小圆点
        }else{
            ctx.fillStyle = '#ccc';//填充颜色
            ctx.arc(x,y,2*rem,0,2*Math.PI,false);//画每一个小圆点
        }
        ctx.fill();//填充圆
    }
}

function drawHour(hour,minute){//画时针
    ctx.save();
    ctx.beginPath();
    let rad = 2*Math.PI/12*hour;
    let mrad = 2*Math.PI/12/60*minute;//小时的分针弧度
    ctx.rotate(rad+mrad);
    ctx.lineWidth = 6*rem;
    ctx.lineCap = 'round';//画线的头尾圆头
    ctx.moveTo(0,5*rem);//移动画线圆点
    ctx.lineTo(0,-r/3);//画线
    ctx.stroke();
    ctx.restore();
}

function drawMinute(minute){//画分针
    ctx.save();//保存之前画布内容状态
    ctx.beginPath();
    let rad = 2*Math.PI/60*minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3*rem;
    ctx.lineCap = 'round';//画线的头尾圆头
    ctx.moveTo(0,5*rem);//移动画线圆点
    ctx.lineTo(0,-r + 40*rem);//画线
    ctx.stroke();
    ctx.restore();//还原之前画布内容状态
}

function drawSecond(second){//画分针
    ctx.save();//保存之前画布内容状态
    ctx.beginPath();
    let rad = 2*Math.PI/60*second;
    ctx.fillStyle = 'red';
    ctx.rotate(rad);
    ctx.moveTo(-2*rem,20*rem);
    ctx.lineTo(2*rem,20*rem);
    ctx.lineTo(1, -r + 18*rem);
    ctx.lineTo(-1, -r + 18*rem);
    ctx.fill();
    ctx.restore();//还原之前画布内容状态
}

function drawDot(){//画钟中间圆点
    ctx.beginPath();
    ctx.fillStyle = '#ccc';
    ctx.arc(0,0,3*rem,0,2*Math.PI,false);
    ctx.fill();
}
function draw(){//动起来
    ctx.clearRect(0,0,width,height);//清除之前画的
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
    
}
draw();
setInterval(draw,1000);


