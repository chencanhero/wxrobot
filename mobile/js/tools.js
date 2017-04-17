        function addZero(obj)
        {
        	if (obj < 10) return "0" + obj; else return obj
    	}
        
        function getCurrentDate()
        {
        	var mydate = new Date();
	        var curr_year = mydate.getFullYear();
	        var curr_month = mydate.getMonth() + 1;
	        var curr_day = mydate.getDate();
	        var curr_H = mydate.getHours();
	        var curr_M = mydate.getMinutes();
	        var curr_S = mydate.getSeconds();
	        var monthDate = curr_year + "-" + addZero(curr_month) + "-" + addZero(curr_day);
	        return monthDate;
        }
        
        function getCurrentDateStr()
        {
        	var mydate = new Date();
	        var curr_year = mydate.getFullYear();
	        var curr_month = mydate.getMonth() + 1;
	        var curr_day = mydate.getDate();
	        var curr_H = mydate.getHours();
	        var curr_M = mydate.getMinutes();
	        var curr_S = mydate.getSeconds();
	        var monthDate = curr_year + "年" + curr_month + "月" + curr_day+"日";
	        return monthDate;
        }
        
		function diffDays()
		{
			var beginTime=getCurrentDate();
		    var endTime="2017-06-07";
		    var aDate, oDate1, oDate2, days; 
			aDate = beginTime.split("-"); 
			oDate1 = new Date(aDate[0], aDate[1], aDate[2]); 
			aDate = endTime.split("-"); 
			oDate2 = new Date(aDate[0] , aDate[1] , aDate[2]); 
			days = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
			return days;
		}

		function checkStrIsNullOrNot(v)
		{
			if (v !== null && v!== undefined && v !== "") 
			{
				return false;
			} 
			return true;
		}
	
	    function getNextStudentExamList()
        {
			if(loadingNextStudent==true)
				return;
			loadingNextStudent = true;
        	 url ="/jeewx/scoreController.do?getNextStudentExamList&studentId="+loadingStudentId;
        	 $.showLoading();
        	 $.ajaxSettings.async = false; 
			 $.getJSON(url,
			 function(data)
			 {
			 	if(data.length!=0)
			 	{
			 		var option = initCanvas(data[0]);
					myChart.setOption(option);
					loadingStudentId = data[0][0].studentid;
			 		$.wait(2000);
			 		loadingNextStudent=false;
			 		 $.ajaxSettings.async = true; 
			 	}
			 });
        }
        
	function initCanvas(scoreList)
	{
		var studentName = scoreList[0].studentname;
		var studentid = scoreList[0].studentid;
	 	var examArray=new Array();
	 	var chineseArray=new Array();
	 	var mathArray=new Array();
	 	var englishArray=new Array();
	 	var politicalArray=new Array();
	 	var historyArray=new Array();
	 	var geoArray=new Array();
	 	var totalArray=new Array();
	 	
	 	console.log(scoreList);
	    for(var i=0;i<scoreList.length;i++)
	    {
	        var examid = scoreList[scoreList.length-1-i].examid;
	        	examid = examid.substring(0,4)+"."+examid.substring(4,6);
	        	examArray[i]=examid;
	        	chineseArray[i]=scoreList[scoreList.length-1-i].chineserank;
	        	mathArray[i]=scoreList[scoreList.length-1-i].mathrank;
	        	englishArray[i]=scoreList[scoreList.length-1-i].englishrank;
	        	politicalArray[i]=scoreList[scoreList.length-1-i].politicalrank;
	        	historyArray[i]=scoreList[scoreList.length-1-i].historyrank;
	        	geoArray[i]=scoreList[scoreList.length-1-i].georank;
	        	totalArray[i]=scoreList[scoreList.length-1-i].rank;
	       }
		
	
		var option = {
			title: {
				text: studentName+'的成绩'
			},
			tooltip: {
				trigger: 'axis'
			},
			backgroundColor:'#f8f8f8',
			legend: {
				data: ['语文', '数学', '英语', '政治', '历史','地理','总分'],
				selected: {
				    '语文': false,
				    '数学': false,
				    '英语': false,
				    '政治': false,
				    '历史': false,
				    '地理': false,
				    '总分': true
				}
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: examArray,
				zlevel:4
			}],
			yAxis: [{
				type: 'value',
				inverse:true
			}],
			series: [{
				name: '语文',
				type: 'line',
				stack: '排名',
				areaStyle: {
					normal: {}
				},
				data: chineseArray
			}, {
				name: '数学',
				type: 'line',
				stack: '排名',
				areaStyle: {
					normal: {}
				},
				data: mathArray
			}, {
				name: '英语',
				type: 'line',
				stack: '排名',
				areaStyle: {
					normal: {}
				},
				data: englishArray
			}, {
				name: '政治',
				type: 'line',
				stack: '排名',
				areaStyle: {
					normal: {}
				},
				data: politicalArray
			}, 
				{
				name: '历史',
				type: 'line',
				stack: '排名',
				areaStyle: {
					normal: {}
				},
				data: historyArray
			}, 
				{
				name: '地理',
				type: 'line',
				stack: '排名',
				areaStyle: {
					normal: {}
				},
				data: geoArray
			}, 
				{
				name: '总分',
				type: 'line',
				stack: '排名',
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				areaStyle: {
					normal: {}
				},
				data: totalArray
				
			}]
		};
		return option;
	}

 $.wait = function(time, type) {
     time = time || 1000;
     type = type || "fx";
     return this.queue(type, function() {
         var self = this;
         setTimeout(function() {
             $(self).dequeue();
         }, time);
     });
 };
 
	function scoreAnalyze(type,$scoreAnalyze)
    {
    	var flag;
    	if(type=="进步最大十名")
        {
        	flag=1;
        	var url="/jeewx/scoreAnalyzeController.do?getPerfectStudent";
        }
        if(type=="退步最大十名")
        {
        	flag=1;
        	var url="/jeewx/scoreAnalyzeController.do?getWorstStudent";
        }
        if(type=="年级前30统计")
        {
        	flag=2;
        	var url="/jeewx/scoreAnalyzeController.do?getTotalRank&num=30";
        }
        if(type=="年级前20统计")
        {
        	flag=2;
        	var url="/jeewx/scoreAnalyzeController.do?getTotalRank&num=20";
        }
        
        if(type=="单科退步最大")
        {
        	flag=2;
        	$.toast("暂不支持");
        	return;
        }
        
       	$.showLoading("加载中");
		$.ajax(
		{
		 	type: 'GET',
		 	url:url,
		 	success:function(data)
			{
				var json=JSON.parse(data);
			 	var params ={};
		 		params.type = type;
		 		params.list = JSON.parse(json.msg);
		 		if(flag=="1")
		 			 html = template('tpl_ScoreAnalyzeMode_diffRank', params);
		 		else
		 			 html = template('tpl_ScoreAnalyzeMode_totalRank', params);
				$("#tpl_ScoreAnalyze").html(html);
				var id = $scoreAnalyze.data('id');
				$.hideLoading();
			 	window.pageManager.go(id);
				//return;
			 }
		});
	}
