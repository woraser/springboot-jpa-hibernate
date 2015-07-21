
jQuery.ajaxSetup({
	beforeSend:function(xhr) {
		xhr.setRequestHeader('Authorization','Bearer '+ token);
	}
});

var DiagramGenerator = {};
var pb1;
$(document).ready(function(){

  pb1 = new $.ProgressBar({
	    boundingBox: '#pb1',
	    label: 'Progressbar!',
	    on: {
		      complete: function() {
			        this.set('label', '完成');
			        if (processInstanceId) {
			        	//设置高亮
			        	ProcessDiagramGenerator.drawHighLights(processInstanceId);
			        }
			        setTimeout("$('#pb1').hide('slow')", 3000 );
		      },
		      valueChange: function(e) {
		    	  this.set('label', e.newVal + '%');
		      }
	    },
	    value: 0
  });
  
  
  ProcessDiagramGenerator.options = {
    diagramBreadCrumbsId: "diagramBreadCrumbs",
    diagramHolderId: "diagramHolder",
    diagramInfoId: "diagramInfo",
    on: {
	      click: function(canvas, element, contextObject){
		        var mouseEvent = this;
		        //console.log("[CLICK] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);
		
		        if (contextObject.getProperty("type") == "callActivity") {
			        var processDefinitonKey = contextObject.getProperty("processDefinitonKey");
			        var processDefinitons = contextObject.getProperty("processDefinitons");
			        var processDefiniton = processDefinitons[0];
			        //console.log("Load callActivity '" + processDefiniton.processDefinitionKey + "', contextObject: ", contextObject);
			
			          // Load processDefinition
			        ProcessDiagramGenerator.drawDiagram(processDefiniton.processDefinitionId);
		        }
		        ToolOperate.show(mouseEvent);
	      },
	      rightClick: function(canvas, element, contextObject){
		        var mouseEvent = this;
		        //console.log("[RIGHTCLICK] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);
		        
		        ToolOperate.hide();
	      },
	      over: function(canvas, element, contextObject){
		        var mouseEvent = this;
		        //console.log("[OVER] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);
		
		        //ProcessDiagramGenerator.showActivityInfo(contextObject);
		        ToolOperate.build("task",contextObject);
	      },
	      out: function(canvas, element, contextObject){
		        var mouseEvent = this;
		        //console.log("[OUT] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);
		
		        //ProcessDiagramGenerator.hideInfo();
		        ToolOperate.hide();
	      }
    }
  };
  
  var baseUrl = window.document.location.protocol + "//" + window.document.location.host + "/";
  
  ActivitiRest.options = {
    processInstanceHighLightsUrl: baseUrl + "common/process-instance/{processInstanceId}/highlights?callback=?",
    processDefinitionUrl: baseUrl + "common/process-definition/{processDefinitionId}/diagram-layout?callback=?",
    processDefinitionByKeyUrl: baseUrl + "common/process-definition/{processDefinitionKey}/diagram-layout?callback=?"
  };
  
  if (processDefinitionId) {
	  ProcessDiagramGenerator.drawDiagram(processDefinitionId);
  } else {
	  alert("processDefinitionId parameter is required");
  }
  ToolOperate.event();
});

var ToolOperate = {
		"id":"#tool_opetion",
		"show":function(e){
			var type=$(ToolOperate.id).attr("data-type") ;
			if(type=="exclusiveGateway" || type=="flow"){
				return;
			}
			$(ToolOperate.id).css("left",e.layerX+10); 
	        $(ToolOperate.id).css("top",e.layerY-30); 
	        $(ToolOperate.id).show();
		},
		"hide":function(){
			$(ToolOperate.id).hide();
		},
		"build":function(type,obj){
			
			var id="",name="",sid="",tid="";
			if(type=="task"){
				id=obj.getId();
				name=obj.getProperty("name");
				type=obj.getProperty("type");
			}else if(type=="flow"){
				name=obj.id;
				id=obj.id;
				sid=obj.sourceActivityId,
				tid=obj.destinationActivityId;
			}
				
			//类型
			$(ToolOperate.id).attr("data-type",type);
			$(ToolOperate.id+" .operate").hide();
			$(ToolOperate.id).attr("data-id",id);
			$(ToolOperate.id+" .title").text(name);
			if("flow" == type){
				$(ToolOperate.id+" .addp").show();
				$(ToolOperate.id).attr("data-sid",sid);
				$(ToolOperate.id).attr("data-tid",tid);
			}else if("serviceTask"== type){
				if(id == "notice-laborer"){

				}else if(id.length>6 && id.substr(0,6) == "notice"){
					//$(ToolOperate.id+" .addn").show();
					$(ToolOperate.id+" .editn").show();
					$(ToolOperate.id+" .deln").show();
				}else{
					$(ToolOperate.id+" .addn").show();
				}
			}else if("userTask"== type){
				$(ToolOperate.id+" .addn").show();
			}
		},
		"event":function(){
			$(ToolOperate.id).hover(function(){
				$(this).show();
			});
			
			$(".addn").click(function(){
				var aid=$(this).parent().attr("data-id");
				parent.processOperate.addNotice(aid);
				ToolOperate.hide();
			});
			$(".editn").click(function(){
				var aid=$(this).parent().attr("data-id");
				parent.processOperate.editNotice(aid);
				ToolOperate.hide();
			});
			$(".deln").click(function(){
				var aid=$(this).parent().attr("data-id");
				parent.processOperate.deleteNotice(aid);
				ToolOperate.hide();
			});
		}
};
