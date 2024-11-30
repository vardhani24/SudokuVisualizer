var sp=0;
var br = document.createElement("br");
function construct() {
			
	// Create a form dynamically
	var form = document.createElement("form");
	

    
    for(let j=0;j<9;j++)
{
    for(let i=0;i<9;i++)
    {
        var block= document.createElement("input");
        block.setAttribute("type", "text");
        block.setAttribute("class","in"+" "+"column"+i)
        block.setAttribute("id","block"+j+i);
        block.setAttribute("autoComplete","off")
        block.setAttribute("name", "reTypePassword"+i);
        if(localStorage.getItem("block"+j+i)!==null)
        {
            block.setAttribute("value",localStorage.getItem("block"+j+i));
        }
        if(j%3==2)
        block.style.marginBottom="3px";
        form.appendChild(block);
        if(i%3==2)
        {
            var space = document.createElement("span");
            space.innerHTML=" ";
            form.append(space);
        }
        
    }
    form.appendChild(br.cloneNode());
}
    form.appendChild(br.cloneNode());
    form.appendChild(br.cloneNode());
    
    document.getElementById("grid")
.appendChild(form);
			}

function save() {
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            var id="block"+i+""+j;
            const ele = document.getElementById(id).value;
            if(ele.length!=0)
            localStorage.setItem(id,ele);
        }
    }
   
}  
function clearGrid() {

    localStorage.clear();
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            var id="block"+i+""+j;
            document.getElementById(id).value=null;
            
        }
    }
   
}           
function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
function start(){
    var sel_s = document.getElementsByName('speed');
    var speed_value=-1;
    for(var i = 0; i < sel_s.length; i++){
    if(sel_s[i].checked){
        speed_value = sel_s[i].value;
    }
}

    if( speed_value==-1)
    {
        alert('Select a speed');
        return;
    }
    sp=speed_value;
    var elem = document.getElementById('btn');
    elem.parentNode.removeChild(elem);
    elem = document.getElementById('btn2');
    elem.parentNode.removeChild(elem);
    var j = document.querySelector('input[name="speed"]:checked').value;
    if(j==null)
    j=0;
    save();
    solve(0,0);
}

async function  solve(m,n) { 
    
    if(n>8)
    {
        m++;
        n=0;
    }   
    if(m>8)
    return true;
    var block = document.getElementById("block"+m+""+n);
    if(block.value.length!==0)
    {
        var next = await solve(m,n+1);
            if(next===true)
            return true;
        return false;
    }
    for(let v=1;v<=9;v++)
    {
        var k = await check(m,n,v);
        if(k===true)
        {
            
            block.value=v+"";
            var next = await solve(m,n+1);
            if(next===true)
            return true;
            else
            {
                block.value="";
            }
        }
        
    }
    if(block.value.length===0)
    return false;
    
    return true;
    
}
async function check(x,y,value)
{
    let f=true;
    var tex
    var block = document.getElementById("block"+x+""+y);
    block.style.backgroundColor="violet";
    f   =  await checkRow(x,y,value);
    if(f==false)
    return false;
    //checking in the same column
    f= await checkColumn(x,y,value);
    if(f==false)
    return false;
    f= await checkBox(x,y,value);
    if(f==false)
    return false;

    return true;
}
async function checkRow(x,y,value)
{
    let f=1;
    for(let j=0;j<9;j++)
    {
        if(y==j)
        continue;
        var block = document.getElementById("block"+x+""+j);
        block.style.backgroundColor="aqua";
    }
    for(let j=0;j<9;j++)
    {
        if(y==j)
            continue;
        
        var block = document.getElementById("block"+x+""+j);
        if(block.value.length!=0 && block.value==value)
        {
            block.style.backgroundColor="red";
            let delayres = await delay(sp);
         
            f=0;
            break;
        }
        else
        block.style.backgroundColor="green";
       let delayres = await delay(sp);
    }
    for(let j=0;j<9;j++)
    {
        if(y==j)
        continue;
        var block = document.getElementById("block"+x+""+j);
        block.style.backgroundColor=null;
    }
    if(f==0)
    return false;

    return true;
}
async function checkColumn(x,y,value)
{
    let f=1;
    for(let j=0;j<9;j++)
    {
        if(x==j)
        continue;
        var block = document.getElementById("block"+j+""+y);
        block.style.backgroundColor="aqua";
    }
    for(let j=0;j<9;j++)
    {
        if(x==j)
        continue;
        var block = document.getElementById("block"+j+""+y);
        if(block.value.length!=0 && block.value==value)
        {
            block.style.backgroundColor="red";
          // let delayres = await delay(sp);
            // var text = document.getElementById("grid");
            // text.innerText="Duplicate "+value+"   found";
            f=0;
            break;
        }
        else
        block.style.backgroundColor="green";
       let delayres = await delay(sp);
    }
    for(let j=0;j<9;j++)
    {
        var block = document.getElementById("block"+j+""+y);
        block.style.backgroundColor=null;
    }
    if(f==0)
    return false;

    return true;

}
async function checkBox(row, col, k) {
    let f=1;
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if(m==row && n==col)
        continue;
        var block = document.getElementById("block"+m+""+n);
        block.style.backgroundColor="aqua";
       
    }
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if(m==row && n==col)
            continue;
            var block = document.getElementById("block"+m+""+n);
            if(block.value.length!=0 && block.value==k)
            {
                block.style.backgroundColor="red";
            let delayres = await delay(sp);
                // var text = document.getElementById("grid");
                // text.innerText="Duplicate "+value+"   found";
                f=0;
                break;
            }
            else
            block.style.backgroundColor="green";
            let delayres = await delay(sp);
        }
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if(m==row && n==col)
            continue;
            var block = document.getElementById("block"+m+""+n);
            block.style.backgroundColor=null;
           
        }

        if(f==0)
        return false;

        return true;
}