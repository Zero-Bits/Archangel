/*=================================================================+
|               Copyright (c) 2013 Oracle Corporation              |
|                  Redwood Shores, California, USA                 |
|                       All rights reserved.                       |
+==================================================================+
| FILENAME                                                         |
|   FNDWFWorklistService.js                                        |
|                                                                  |
| HISTORY                                                          |
|   22-FEB-2013 swamilin  Created.                                 |
+==================================================================*/
/* $Header: FNDWFWorklistService.js 120.0.12020000.18 2014/05/29 09:42:21 swamilin noship $ */

var LxmlHttp = null;
var textWidth = 50;
var baseUrl = "";
var myWorklist="";
var errorMsg = "";
var fullWorklist ="";
var zeroNtf = "";
var browserVal = "";
ntfArray = [];
NtfList = [];
var onenterpress = false;
var showpopup = false;
var tabevent = false;
var worklistCount = "";
var worklistIcon = "";
var brandingValue="";
isIE =	_agent.isIE;
version =	_agent.version;

function WFGetOpenWorklistCount(openNtfcount,params,brandingVal){

	      
	setNtfCount();
	
	worklistCount =document.getElementById('NtfCount');
	brandingValue = brandingVal;
	if(isBiDi()){
   		worklistCount.style.cssFloat = "left";
   		worklistCount.style.paddingLeft = "3px";
		worklistCount.style.left = "12px";
		
		if(brandingValue != "R") {
		worklistCount.style.top = "-6px";
		worklistCount.style.left = "-42px";
		
		}


   	}
	

	if(openNtfcount > 99){
	openNtfcount = "99+";
	}
	if(brandingValue == "R"){
		worklistCount.style.fontSize= "9px";
		
	}
		
	worklistCount.innerHTML= openNtfcount;
	addListeners(params);



 }

function addListeners(params){


button=document.getElementById('SNTF');

if (button.addEventListener) {

  button.addEventListener("keydown", function(event) {

	var eventCode = event.which || event.keyCode;
    if( (eventCode  == 1 || eventCode == 40 || eventCode  == 38 || eventCode == 32 || eventCode == 0) && showpopup == false){
      
		WFGetOpenWorklist(params);
	}
  },false);
}
else if (button.attachEvent) {

	button.attachEvent("onkeydown", function(event) {

	var eventCode = event.which || event.keyCode;

    if ((eventCode == 1 || eventCode == 40 || eventCode == 38 || eventCode == 32 || eventCode == 0) && showpopup == false){
      
		WFGetOpenWorklist(params);
	}
  } ,false);
}


}


function SWFGetOpenWorklistCount(openNtfcount,params){

	       
	setNtfCount();
	brandingValue = "S";

	worklistCount.appendChild(document.createTextNode("("+openNtfcount+") "));
	addListeners(params);


 }


function setNtfCount(){
	worklistCount =document.getElementById('NtfCount');
	worklistIcon= document.getElementById("img");
	//clearing existing table contents
	WFClearTable(worklistCount);

	if(isBiDi()){
   		worklistCount.style.cssFloat = "left";
   		worklistCount.style.paddingLeft = "3px";
		worklistCount.style.left = "-35px";

   		worklistIcon.style.cssFloat = "right";
   		worklistIcon.style.paddingLeft = "3px";

	}


}


function WFGetOpenWorklist(params){

   if (onenterpress == false){
	// parse the arguments
	arraylength = params.length;
	params = params.substring(1,arraylength-1);
  	arrayFromJava = params.split(",");
	window.myWorklist = arrayFromJava[0];
	window.fullWorklist =arrayFromJava[1];
	window.zeroNtf = arrayFromJava[2];
	window.processingMsg = arrayFromJava[3];
	window.fullListUrl = arrayFromJava[4];
	browserVal = navigator.userAgent.toLowerCase();


	// display processing msg
	var worklistTable =document.getElementById('WorklistTable');
	WFClearTable(worklistTable);
	worklistTable.setAttribute('class', 'x8');
	var ntch = document.createElement('div');
	ntch.className = 'ntfnotch';
	worklistTable.appendChild(ntch);
	if(isBiDi()){
		if(brandingValue == "R")
			worklistTable.style.left="5px";
		else if(brandingValue == "M")
			worklistTable.style.left="-28px";
		else
			worklistTable.style.left="5px";
			
	}
	else{
	
	if(brandingValue == "S"){
		worklistTable.style.left="-175px";
		
	}
	else if(brandingValue == "M")
		worklistTable.style.right="-49px";
	else
	 	worklistTable.style.right="-77px";


	}

	worklistTable.style.marginTop="2px";
	worklistTable.style.width="300px";
	worklistTable.appendChild(document.createTextNode(processingMsg));
	worklistTable.style.display = "block";
	//worklistTable.style.top = "35px";
	worklistTable.style.padding = "0px";
	worklistTable.style.zIndex="100";
	STopMenuBar = document.getElementById("img");
	STopMenuBar.appendChild(worklistTable);

	if (LxmlHttp == null){
		WFGetXmlHttpObject();
	}

	var Lurl = baseUrl+"RF.jsp?function_id=WF_SERVICE_OA_HOME";
	WFGetXmlHttpObject();
	LxmlHttp.onreadystatechange = WFParseXML;
	LxmlHttp.open("POST", Lurl, true);
	LxmlHttp.setRequestHeader("Content-type", "application/xml");
	var body = "<params><param>10</param><param>1</param></params>";
	LxmlHttp.send(body);
	}


 }

 function WFGetXmlHttpObject(){

	LxmlHttp = null;
	try {
		// Firefox, Opera 8.0+, Safari, IE 7
		LxmlHttp = new XMLHttpRequest();
	}
	catch (e)
	{
		try{
			// Other Internet Explorer versions.

			LxmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
    			LxmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
   		}
  	}
 }

 function WFParseXML(){


	if(LxmlHttp.readyState==4) // 4 = "loaded"
	{
          var worklistTable =document.getElementById('WorklistTable');
	   //clearing existing table contents
		WFClearTable(worklistTable);

	   if (LxmlHttp.status == 200)
      	   {

       		var xmlDoc = LxmlHttp.responseXML;
			if(isIE && (version == 10 || version == 11))
			{
			    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = "false";
				xmlDoc.loadXML(LxmlHttp.responseText);
			}
			if(!xmlDoc || xmlDoc.childNodes.length == 0)
    		{
          		text = LxmlHttp.responseText;
	      		xmlDoc = WFLoadXmlContentString(text);
    		}
    		if (xmlDoc != null)
			{
       			responseDoc = xmlDoc.getElementsByTagName("response");
			if (responseDoc != null && responseDoc.length > 0)
          		{

			worklistTable.setAttribute('class', 'x8');
			var ntch = document.createElement('div');
			ntch.className = 'ntfnotch';
			worklistTable.appendChild(ntch);

			var worklistIcon= document.getElementById("WfImg");


			if(isBiDi()){
				if(brandingValue == "R")
					worklistTable.style.left="5px";
				else if(brandingValue == "M")
					worklistTable.style.left="-28px";
				else
				 	worklistTable.style.left="5px";
			
			}
			else{
				
				if(brandingValue == "S"){
					worklistTable.style.left="-175px";
					
				}
				else if(brandingValue == "M")
				 	worklistTable.style.right="-49px";
				else
				 	worklistTable.style.right="-77px";


			}


			worklistTable.style.zIndex="100";


			worklistTable.style.width="300px";


			worklistTable.style.backgroundColor = "#FFFFFF";

			worklistTable.style.position = "absolute";
			worklistTable.style.display = "block";

			document.onclick=function(){ WFHide(); } // hide popup on outside click
			// hide pop up on escape key press
			document.onkeydown = function(event) {

				WFdivHide(worklistTable,event);
			}

			worklistTable.style.borderRadius = '9px';
			worklistTable.style.padding = '0px';
			

			if(isIE)
 			{

  				xmlDoc.setProperty('SelectionLanguage', 'XPath');
				xmlDoc.setProperty('SelectionNamespaces','xmlns:ns1="http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklist/" xmlns:ns2="http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklistmgmt/" xmlns:ns3="http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/notificationdetails/"');

				notificationrec = xmlDoc.selectNodes('/response/ns1:output/ns2:notifications');
				notificationrows = xmlDoc.selectNodes('/response/ns1:output/ns2:notifications/ns2:notification');

			}
			else if(browserVal.indexOf("firefox") > -1){
				output = xmlDoc.getElementsByTagNameNS("http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklist/", "output");
				xmlDoc = output[0];
				notificationrec = xmlDoc.getElementsByTagNameNS("http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklistmgmt/", "notifications");
				xmlDoc = notificationrec[0];
				notificationrows = xmlDoc.getElementsByTagNameNS("http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklistmgmt/", "notification");

			}
			else if(browserVal.indexOf("safari") > -1 || browserVal.indexOf("chrome") > -1 ){

				output = xmlDoc.getElementsByTagName("output");
				xmlDoc = output[0];
				notificationrec = xmlDoc.getElementsByTagName("notifications");
				xmlDoc = notificationrec[0];
				var notificationrows = xmlDoc.getElementsByTagName("notification");


			}
				var notifcount = notificationrec[0].getAttribute('count');


			// display error msg if count is 0
			if (notifcount == 0){
				 worklistTable.style.className = "OraHeaderBarText";
				 var MsgNode = document.createTextNode("\u00a0 \u00a0"+zeroNtf);
				 worklistTable.appendChild(MsgNode);
				}

			else{
			var headerNode = document.createElement('div');
			var headerNodeText = document.createElement('div');
			

			headerNode.style.height = "35px";
			headerNodeText.style.color = "#000000";
			headerNodeText.style.paddingTop = "12px";
			
			headerNodeText.style.fontWeight = "bold";
			
			headerNode.style.borderBottom = "1px solid #99BEDC";
			headerNode.style.borderTopLeftRadius = '7px';
			headerNode.style.borderTopRightRadius = '7px';
			
			headerNode.style.border = 'none';
			
			headerNodeText.style.fontSize= "14px";
			headerNode.style.backgroundColor = "#ebebeb";
			headerNodeText.style.fontFamily = "Arial";
			
			if(isBiDi()){
			headerNode.style.paddingRight = "1em";
			headerNode.style.width = "92%";
			}
			headerNodeText.style.paddingLeft = "15px";
			headerNode.style.borderLeft = 'none';
			headerNodeText.appendChild(document.createTextNode(myWorklist));
			headerNode.appendChild(headerNodeText);

			worklistTable.appendChild(headerNode);

			newNode = document.createElement('div');
			newNode.id = 'newNode';


			for (var n = 0; n < notifcount ; n++){

			   xmlDoc = notificationrows[n];
			   if(isIE)
 			   {

			   	var ntfIds =  xmlDoc.selectNodes('ns2:NotificationId');
			   	var fromUsers =  xmlDoc.selectNodes('ns2:FromUser');
			  	var subjects = xmlDoc.selectNodes('ns2:Subject');
			   	var sendDates = xmlDoc.selectNodes('ns2:SentTime');
			   	var endDates =  xmlDoc.selectNodes('ns2:DueIn');


			   }
			   else if(browserVal.indexOf("firefox") > -1){

			    	var ntfIds =  xmlDoc.getElementsByTagNameNS("http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklistmgmt/", "NotificationId");
			   	var fromUsers =  xmlDoc.getElementsByTagNameNS("http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklistmgmt/", "FromUser");
			   	var subjects = xmlDoc.getElementsByTagNameNS("http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklistmgmt/", "Subject");
			   	var sendDates = xmlDoc.getElementsByTagNameNS("http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklistmgmt/", "SentTime");
			   	var endDates =  xmlDoc.getElementsByTagNameNS("http://xmlns.oracle.com/apps/fnd/wf/worklist/service/rt/artifacts/worklistmgmt/", "DueIn");


			   }

			   else if(browserVal.indexOf("safari") > -1 || browserVal.indexOf("chrome") > -1 ){
				var ntfIds =  xmlDoc.getElementsByTagName("NotificationId");
			   	var fromUsers =  xmlDoc.getElementsByTagName("FromUser");
			        var subjects = xmlDoc.getElementsByTagName("Subject");
				var sendDates = xmlDoc.getElementsByTagName("SentTime");
			        var endDates =  xmlDoc.getElementsByTagName("DueIn");

			   }


			   var ntfId ="";
			   var fromUser="";
			   var itemType="";
			   var subject="";
			   var sendDate = "";
			   var endDate = "";

			   if(ntfIds[0]!=null && ntfIds[0].firstChild!=null){
				  ntfId = ntfIds[0].firstChild.nodeValue;
				  ntfArray[n] = ntfId;

			   }
			   if(fromUsers[0]!=null && fromUsers[0].firstChild!=null)
				  fromUser = fromUsers[0].firstChild.nodeValue;

			   if(subjects[0]!=null && subjects[0].firstChild!=null)
			   {
				  subject = subjects[0].firstChild.nodeValue;

			   }
			   if(sendDates[0]!=null && sendDates[0].firstChild!=null)
				  sendDate = sendDates[0].firstChild.nodeValue;
			   if(endDates[0]!=null && endDates[0].firstChild!=null)
				  endDate = endDates[0].firstChild.nodeValue;

		   	   WFdivPopulateWorklistTable(ntfId,fromUser,subject,n,sendDate,endDate,worklistTable,newNode);
			   var divs = newNode.getElementsByTagName('div');

			   if ( n == 7 ){
				break;
			   }
			   var newdiv = document.getElementById('newNode');

		   } // END OF FOR LOOP



		divs = newNode.childNodes;
		window.setTimeout(function() {
		divs[0].childNodes[3].getElementsByTagName('a')[0].focus();
		},50);
		// key up and key down events for accessibility feature
			function WFondivchange(div, i){
 				   // div is the highlighted div
  				  // i is it's index

			}

			(function(callback){
    				callback = callback || function(){};


					selectedDiv = 0;
    				var i;

				    //divs[selectedDiv].childNodes[1].getElementsByTagName('a')[0].focus();


    				document.onkeydown = function(e)
				    {
					keyCode=-1;
					var event = e || window.event;
          				if(event)
          				{
            					if(event.which)
               		  			keyCode = event.which;
           		      			 else if(event.keyCode)
                		 			 keyCode = event.keyCode;
          				}
        		 		var x = 0;
					//document.getElementById("subjectdiv").setAttribute("tabIndex", "-1");

					if (selectedDiv == 0)
						selectedntf = ntfArray[selectedDiv];
					if(keyCode == 38 && selectedDiv != 0){
             					x = -1;
								
								}
         	 			else if(keyCode == 40 && selectedDiv != 9){
            		 			x = 1;
								
								}
					else if( (keyCode == 13 || keyCode == 121) && showpopup == true){

						location.href = "OA.jsp?OAFunc=FND_WFNTF_DETAILS&NtfId="+selectedntf+"&addBreadCrumb=Y&retainAM=Y";
						onenterpress  = true;
						return;

						}
         			else if (keyCode == 27 && showpopup == true )
                         WFdivHide(worklistTable,event);

					else if(keyCode == 9 && selectedDiv != 9){
						selectedDiv ++;
					}

	  	 			else
            		 	return ;


        	 			selectedDiv = ((selectedDiv+x)%divs.length);
         	 			selectedDiv = selectedDiv < 0 ? divs.length+selectedDiv : selectedDiv;

					    selectedntf = ntfArray[selectedDiv];


					
						divs[selectedDiv].childNodes[3].getElementsByTagName('a')[0].focus();
					if (event.preventDefault)
						{
							event.preventDefault();
							return false;

						}
					if (event.stopPropagation)
					{
						event.stopPropagation();
						return false;
					}

         	 			callback(divs[selectedDiv], selectedDiv);
    				};

		})(WFondivchange);

		}

	   }
	   footerNode = document.createElement('div');
	   		footerNode.style.height = "30px";
			
	   		footerNode.style.borderBottom = "none";
	   		
	   		footerNode.style.paddingTop = "10px";
			
			footerNode.style.backgroundColor = "#ebebeb";
			
			footerNode.style.borderBottomLeftRadius = '7px';
			footerNode.style.borderBottomRightRadius = '7px';


	   		
	   		footerLink = document.createElement('a');
			footerLink.style.color = "#3366cc";
			footerLink.style.fontFamily = "Arial";
			footerLink.style.fontWeight= "Normal";
			footerLink.style.fontSize= "12px";
			footerLink.style.paddingLeft = "15px";
			footerLink.style.paddingTop = "5px";
			footerLink.style.paddingBottom = "5px";

	   		footerLink.appendChild(document.createTextNode(fullWorklist));

	   		footerLink.setAttribute('href',fullListUrl);

	   		footerNode.appendChild(footerLink);

	   		worklistTable.appendChild(footerNode);
	   		var STopMenuBar = document.getElementById("img");
	   		STopMenuBar.appendChild(worklistTable);
		       showpopup = true;
     }


   }

  }

}


function WFHide(){
 var divTag=document.getElementById('WorklistTable');
 var evt=window.event||arguments.callee.caller.arguments[0];
 var eobj=window.event?evt.srcElement:evt.target;
 if(eobj.nodeType==3) eobj=eobj.parentNode;
 while (eobj.parentNode){
  if (eobj==divTag) return;
  eobj=eobj.parentNode;
 }
 divTag.style.display='none';
 showpopup = false;

}


function WFdivPopulateWorklistTable(ntfId,fromUser,subject,n,sentDate,dueDate,worklistTable,newNode){

	var rowdiv = document.createElement('div');
	var ndiv = document.createElement('div');
	ndiv.style.width = "100%";
	
	rowdiv.style.height = "55px";
	rowdiv.style.borderBottom = "1px solid #cccccc";
	


	rowdiv.onmouseover = function() {
		  this.style.backgroundColor = "#d1dae1";
		}
	rowdiv.onmouseout = function() {
		  this.style.backgroundColor = "#FFFFFF";
		}
		


	if(sentDate!=null){
		var sendDatediv = document.createElement('div');
		sendDatediv.style.color= "#6c6c6c";
		
		sendDatediv.style.fontFamily = "Arial";
		sendDatediv.style.fontWeight= "Normal";

		if(isBiDi()){
			sendDatediv.style.paddingLeft = "1em";
			if(browserVal.indexOf("msie") > -1)
 			   sendDatediv.style.styleFloat = "left";

       		else

			   sendDatediv.style.cssFloat = "left";
		}
		else{
			sendDatediv.style.paddingRight = "1em";

			if(browserVal.indexOf("msie") > -1)
 			   sendDatediv.style.styleFloat = "right";
			else
			   sendDatediv.style.cssFloat = "right";
		}

		
		sendDatediv.style.fontSize= "11px";
		sendDatediv.style.paddingTop = "1px";
		sendDatediv.appendChild(document.createTextNode(sentDate));
		rowdiv.appendChild(sendDatediv);
	}


		
	if(fromUser!=null)
       {

		var fromUserdiv = document.createElement('div');

		fromUserdiv.style.paddingRight = "1em";

       	
		fromUserdiv.style.paddingTop = "1px";
		
		fromUserdiv.style.color = "#000000";
		fromUserdiv.style.fontSize= "11px";
		fromUserdiv.style.fontFamily = "Arial";
		fromUserdiv.style.fontWeight= "Bold";
		
		fromUserdiv.style.width = "150px";
		
		
		if(isBiDi()){
		  if(browserVal.indexOf("msie") > -1)
			fromUserdiv.style.styleFloat = "right";
		  else
              	fromUserdiv.style.cssFloat = "right";
		  fromUserdiv.style.paddingRight = "1em";
		  fromUserdiv.style.textAlign="right";
		}
		else{
		  if(browserVal.indexOf("msie") > -1)
              	fromUserdiv.style.styleFloat = "left";
		  else
		       fromUserdiv.style.cssFloat = "left";

		 
		 fromUserdiv.style.paddingLeft = "1em";
		fromUserdiv.style.textAlign="left";
		}
		
		fromUserdiv.appendChild(document.createTextNode(fromUser));
		rowdiv.appendChild(fromUserdiv);
	}
	
	
	

	var br=document.createElement('br');
	rowdiv.appendChild(br);
	
	if(dueDate!=null){
		var dueDatedivrow = document.createElement('div');
		dueDatedivrow.style.color= "#6c6c6c";
		
		dueDatedivrow.style.fontFamily = "Arial";
		dueDatedivrow.style.fontWeight= "Normal";

		if(isBiDi()){
		  if(browserVal.indexOf("msie") > -1)
			dueDatedivrow.style.styleFloat = "left";
		  else
              	dueDatedivrow.style.cssFloat = "left";

		}
		else{
		  if(browserVal.indexOf("msie") > -1)
              	dueDatedivrow.style.styleFloat = "right";
		  else
		       dueDatedivrow.style.cssFloat = "right";

		 dueDatedivrow.style.paddingRight = "1em";

		}
		dueDatedivrow.style.marginTop ='1px';
		dueDatedivrow.style.marginLeft ='10px';

		dueDatedivrow.style.marginBottom ='1px';
		dueDatedivrow.style.border = '0px';
		dueDatedivrow.style.paddingTop = "1px";
		dueDatedivrow.style.width = "65px";
		dueDatedivrow.style.fontSize= "11px";
		
		dueDatedivrow.appendChild(document.createTextNode(dueDate));
		rowdiv.appendChild(dueDatedivrow);
	}
	
	if(subject!=null){

		subjectdiv = document.createElement('div');
		
		if(isBiDi()){
			subjectdiv.style.paddingRight = "1em";
			subjectdiv.style.textAlign="right";
			 if(browserVal.indexOf("msie") > -1)
              	subjectdiv.style.styleFloat = "right";
			else
		       subjectdiv.style.cssFloat = "right";

			
		}
		else{
			subjectdiv.style.paddingLeft = "1em";
			subjectdiv.style.textAlign="left";
			if(browserVal.indexOf("msie") > -1)
              	subjectdiv.style.styleFloat = "left";
			else
		       subjectdiv.style.cssFloat = "left";
		}
		subjectdiv.style.whiteSpace = "pre-wrap";
		

		subjectlink = WFautoEllipsis(subject,'50');
				
		subjectdiv.style.marginTop ='1px';
		subjectdiv.style.marginBottom ='1px';
		subjectdiv.style.border = '0px';
		subjectdiv.style.paddingTop = "1px";
		//subjectdiv.style.textAlign="justify";
		//subjectdiv.style.wordBreak="break-all";
		subjectdiv.style.width = "195px";
		theLink = document.createElement('a');
		theLink.style.color = "#000000";
		theLink.style.fontFamily = "Arial";
		theLink.style.fontWeight= "Normal";
		theLink.style.fontSize= "11px";
		theLink.appendChild(document.createTextNode(subjectlink));
	

		theLink.setAttribute('href', 'OA.jsp?OAFunc=FND_WFNTF_DETAILS&NtfId='+ntfId+'&addBreadCrumb=Y&retainAM=Y&source=wlheader');
		theLink.setAttribute('title',subject);
		subjectdiv.appendChild(theLink);
		NtfList[n] = theLink;
		rowdiv.appendChild(subjectdiv);
	}

      

	
	
	
	
	newNode.appendChild(rowdiv);

	worklistTable.appendChild(newNode);


}


function WFclosepopup(){

    var divTag=document.getElementById('WorklistTable');
 	var evt=window.event||arguments.callee.caller.arguments[0];
 	var eobj=window.event?evt.srcElement:evt.target;
  	divTag.style.display='none';
	showpopup = false;

	return;

}


  
  function WFLoadXmlContentString(xmlData)
  {
    if(xmlData==null)
	  return;
    
    if (document.implementation && document.implementation.createDocument && typeof XSLTProcessor != 'undefined')
    {
      //for Mozilla
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlData, "application/xml");
      return xmlDoc;
    }
	else try{
    
      //for IE
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(xmlData);
	  return xmlDoc;
    }
	catch (e) {
    // no support
    console.log('transformxml: no browser support');
    return null;
	}
  }


  function WFClearTable(tableRef)
  {

	  if (tableRef.hasChildNodes())
	  {
		 while ( tableRef.childNodes.length >= 1 ){
			tableRef.removeChild(tableRef.firstChild);
		 }
	  }
  }



  function WFautoEllipsis(text,offsetwidth){
     var width = text.length;

     if(width>textWidth){
	if(isBiDi())
	text = '...' + text.substr(0,offsetwidth) ;
	else
       text = text.substr(0,offsetwidth) + '...';
     }

  return text;
  }


function WFdivHide(worklistTable,event){

        var event=window.event || event;

        var keyCode=-1;
        if(event)
        {
            if(event.which){

                keyCode = event.which;
		}
            else if(event.keyCode) {

                keyCode = event.keyCode;
		}
            if((event.type=="keyup")&&(keyCode != 27)){

              return;
            }
        }

        if(keyCode == 27)
        {

	   worklistTable.style.display = "none";
	   showpopup = false;


        }

}



function isBiDi()
{
	var html = document.getElementsByTagName("html");
	if (html != null || html.length > 0)
	{
		if (html[0].dir == "rtl")
		{
			return true; // direction tag is rtl
		}
	}
	return false; // return default = ltr
}

