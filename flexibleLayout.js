/*=================================================================+
|               Copyright (c) 2000 Oracle Corporation              |
|                  Redwood Shores, California, USA                 |
|                       All rights reserved.                       |
+==================================================================+
| FILENAME                                                         |
|   flexibleLayout.js                                              |
|                                                                  |
| HISTORY                                                          |
|   12-MAY-09 rmnatara Created for ER 8505590                      |
|   11-Feb-13 snaoleka Bug Fix for bug -16274511                   |
+==================================================================*/
/* $Header: flexibleLayout.js 120.2.12020000.4 2014/04/17 11:30:03 spunam ship $ */

var FXh; 
var Flaffamily;
var FcloseIcon ="";
var FdiscloseIcon= "" ;
/* function to handle the expand/collapse event */
function Ftogle(Felem, Fanchr, am, dRef, url)
{
    var ele = document.getElementById(Felem+'_hsitem_div');
    var img = document.getElementById(Fanchr);
    var state ='';
  
    if(ele.style.display == "block") 
    {
        state = "hidden";
        Fstore(Felem, am, dRef, state, url);
        ele.style.display = "none";
        img.src = FdiscloseIcon;
    }
    else 
    {
        state = "disclosed";
        Fstore(Felem, am, dRef, state, url);
        ele.style.display = "block";
        img.src = FcloseIcon;
    }
}

/* Intialize the flexible item state on page load */
function Finit(Fdiv, Fanchr, Fdisp, CurrLAF)
{
    var ele = document.getElementById(Fdiv);
    var img = document.getElementById(Fanchr);
    FlafFamily = CurrLAF ;
   
   // snaoleka:bug-16274511
    if(FlafFamily == "skyros")
    {
    FdiscloseIcon = "/OA_MEDIA/disclosecollapsed_ff_ena.png" ;
    FcloseIcon = "/OA_MEDIA/discloseexpanded_ff_ena.png";
    }
    else
    {
    FcloseIcon = "/OA_MEDIA/hideshow_infoshown.gif" ;
    FdiscloseIcon = "/OA_MEDIA/hideshow_infohidden.gif" ;
    }
    if(Fdisp == "block")
    {
        ele.style.display = "block";
        img.src = FcloseIcon;
    }
    else if(Fdisp == "none")
    {
        ele.style.display = "none";
        img.src = FdiscloseIcon ;
    }
}

/* Api to store the flexibleLayout item state in the MDS */
function Fstore(Fid, am, dRef, Fstate, url)
{
   //Need to use APIs provided in OARESTUtil to generate the URL
   //var url = "RF.jsp?function_id=CONFIG_PAGE_REST_SERVICE";
    
    var body = "<params><param name=\"Fid\">" + Fid + "</param>";
    body = body +  "<param name=\"am\">" + am + "</param>";
    body = body +  "<param name=\"dRef\">" + dRef + "</param>";
    body = body + "<param name=\"Fstate\">" + Fstate + "</param></params>";
    
    //xmlHttp.onreadystatechange = parseXML;
    if(FXh == null)
    {
        FXh = getObj();
    }
    FXh.open("POST", url, true);
    FXh.setRequestHeader("Content-type", "text/xml"); 
    FXh.send(body);
}

/* Creates a XML Request object depending on the browser type */
function getObj()
{
    var FXh = null;
    try
    {
        // Firefox, Opera 8.0+, Safari, IE 7
        FXh = new XMLHttpRequest();
    }
    catch (e)
    {
        // Other Internet Explorer versions.
        try
        {
            FXh = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            FXh = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return FXh
}

/* Returns true if the request is from IE browser */
function isIE()
{   
    return _agent.isIE;
}
