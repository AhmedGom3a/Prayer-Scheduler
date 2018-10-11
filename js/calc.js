var table1 =document.getElementById("table1"); 
var table2 =document.getElementById("table2");
var table3 =document.getElementById("table3");  
var bcalc= document.getElementById("bcalc");
var baddweek= document.getElementById("baddweek");
var row1 = table1.getElementsByTagName("tr")[0];
var row2 = table2.getElementsByTagName("tr")[1];
var row3 = table3.getElementsByTagName("tr")[2];
var cell = row1.getElementsByTagName("td")[1];
var sel = cell.getElementsByTagName("select")[0];
var tex = cell.getElementsByTagName("input")[0];
var bar;
var per=document.getElementById("per");
var circle =document.getElementById("circle");
var week=0;
var empty=0;
var notNum=0;
var total=0;
var percent;
var i, j;
var weekmiss=0;
var allmisss= new Array();
var weeknum,weekdate,weekper;
var trig=0;
/*e1sel.onchange=function(){
    if (e1sel.value==="+"){
        e1tex.readOnly = false;
    }
    else{
        e1tex.readOnly = true;
    }
};*/
bcalc.onclick=function()
	{
        empty=0;
        notNum=0;
        total=0;
	    for (i=1 ; i<=5 ;i++)
	   		{
	            row1 = table1.getElementsByTagName("tr")[i];
	            week=0;
	            weekmiss=0; 
		        for (j=1 ; j<=7 ;j++)
		        {
		             cell = row1.getElementsByTagName("td")[j];
		             sel = cell.getElementsByTagName("select")[0];
		             tex = cell.getElementsByTagName("input")[0];
		             if(sel.value=="H"||sel.value=="*"){total++;}
		             else if(sel.value=="+" && tex.value!=="" && !isNaN(Number(tex.value))){total++;week=week+Number(tex.value);weekmiss=weekmiss-Number(tex.value);}
		             else if(sel.value=="+" && tex.value ==="" && !isNaN(Number(tex.value))){empty++;}
		             else if(sel.value=="+" && tex.value!=="" && isNaN(Number(tex.value))){notNum++;}
		             else if(sel.value=="-"){week--;weekmiss++;}
		        }
		        miss=row1.getElementsByTagName("td")[8];
		        miss.innerHTML=weekmiss*(-1);
		        allmisss[i-1]=weekmiss;
		        //console.log("week "+i+" "+week);
	   		}
		console.log("total "+total);
	    console.log("empty "+empty);
	    console.log("notNum "+notNum);
   		if(empty===0 && notNum===0)
   			{
   				percent=(((total/35))*100);
                        if(percent<50.5)
                            {
                                circle.innerHTML="<div class=\"c100 p50 big\"><span id=\"per\">50%</span><div class=\"slice\"><div class=\"bar\" id=\"bar\"></div><div class=\"fill\"></div></div></div>";
                            }
                        else
                            {
                                  circle.innerHTML="<div class=\"c100 p100 big\"><span id=\"per\">50%</span><div class=\"slice\"><div class=\"bar\" id=\"bar\"></div><div class=\"fill\"></div></div></div>";                                            
                            }
			    bar=document.getElementById("bar");
			    per=document.getElementById("per"); 
			    bar.style.transform="rotate("+(((percent)/100)*360)+"deg)";
			    per.innerHTML=parseInt(percent)+"%";
			   
   			}
   		else
   			{
        		alert("you have "+notNum+" Errors! and "+empty+" Empty \"plus\" Cells");
   			}
   			trig=1;
	};
baddweek.onclick=function()
	{	
	if(trig==1){
		/* ---- table 2 editing ---- */
		var rows=table2.getElementsByTagName("tr"); 
		var totalrows=rows.length;
		var lastrow=table2.getElementsByTagName("tr")[totalrows-1];
		row2=table2.insertRow();
		weeknum=row2.insertCell(0);
		weekper=row2.insertCell(1);
		weekdate=row2.insertCell(2);
		if(totalrows<=1){weeknum.innerHTML=1;}
		else{var lastweeknum=lastrow.getElementsByTagName("td")[0];weeknum.innerHTML=1+parseInt(lastweeknum.innerHTML);}
		weekper.innerHTML=parseInt(percent)+"%";
		weekdate.innerHTML="10/10/2010";

		/* ---- table 3 editing ---- */
		var rows=table3.getElementsByTagName("tr");
		var totalrows=rows.length;
		var lastrow=table3.getElementsByTagName("tr")[totalrows-1];
		var pray;
		var lastweekmiss=new Array();
		row3=table3.insertRow();
		weeknum=row3.insertCell(0);
		weekdate=row3.insertCell(1);
		if(totalrows<=2)
			{
				weeknum.innerHTML=1;
						for(var i=0; i<5;i++)
							{
								pray=row3.insertCell(2+i);
								pray.innerHTML=allmisss[i];
							}
			}
		else
			{
				var lastweeknum=lastrow.getElementsByTagName("td")[0];
				weeknum.innerHTML=1+parseInt(lastweeknum.innerHTML);
				for(var i=0; i<5;i++)
							{
								lastweekmiss[i]=parseInt(lastrow.getElementsByTagName("td")[i+2].innerHTML);
								pray=row3.insertCell(2+i);
								pray.innerHTML=allmisss[i]+lastweekmiss[i];
							}
			}
		weekdate.innerHTML="10/10/2010"; 
		trig=0;
	}
	else{alert("calculate first")}	
	};