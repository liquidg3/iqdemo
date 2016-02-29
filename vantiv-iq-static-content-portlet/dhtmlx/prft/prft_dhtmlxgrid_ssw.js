/*
 * Author: Mike Altieri   mike.altieri@perficient.com
 * 
 * Copyright Perficient Inc. http://www.perficient.com
 * 
 * This library requires dhtmlxgrid.js (for all functions)
 * and dhtmlxgrid_mcol.js (for the column order functions) to work
 * 
 */

//based off of DHTMLX LTD. v.2.6 build 100722

dhtmlXGridObject.prototype.enableAutoSizeSavingToWeb = function(){
	this.attachEvent("onResizeEnd",function(){
		this.saveSizeToWeb(); 
	});
};

dhtmlXGridObject.prototype.enableAutoHiddenColumnsSavingToWeb = function(){
	this.attachEvent("onColumnHidden",function(){
		this.saveOrderToWeb();
		this.saveHiddenColumnsToWeb();
		this.saveSizeToWeb();
		this.saveSortingToWeb();
	});
};

dhtmlXGridObject.prototype.enableAutoSortingSavingToWeb = function(){
	this.attachEvent("onBeforeSorting",function(){
		var that=this;
		window.setTimeout(function(){
			that.saveSortingToWeb();
		},1);
		return true;
	});
};

dhtmlXGridObject.prototype.enableAutoOrderSavingToWeb = function(){
	this.attachEvent("onAfterCMove",function(){
		this.saveOrderToWeb();
		this.saveSizeToWeb();
		this.saveSortingToWeb();
		this.saveHiddenColumnsToWeb();
	});
};

dhtmlXGridObject.prototype.setSaveToWebUrl = function(saveToWebUrl){
	this.saveToWebUrl = saveToWebUrl;
}

dhtmlXGridObject.prototype.nowSaveToDB=function(type){
	//alert("blah blah");
	var colsOrder = "";
	var colsWidth = "";
	var colsSorting = "";
	var colsHidden = "";
	colsOrder = this.getColsOrder();
	colsWidth = this.getColsWidth();
	colsSorting = this.getColsSorting();
	colsHidden = this.getColsHidden();
	//-------------------------------------pass params to DB
	
		if(colsHidden==""){
			this.databaseStoredNoValue="true";
		}
		this.hiddenCols = colsHidden;
		var url = this.saveToWebUrl;
		var params = "&gridId="+this.entBox.id+"&colsOrder="+colsOrder+"&colsWidth="+colsWidth+"&colsSorting="+colsSorting+"&colsHidden="+colsHidden;
		//alert(params);
		doAjaxPost(url, params,"true");
	
	
}

dhtmlXGridObject.prototype.enableAutoSavingToWeb = function(saveToWebUrl){
	this.saveToWebUrl = saveToWebUrl;
	this.enableAutoHiddenColumnsSavingToWeb();
	this.enableAutoOrderSavingToWeb();	
	this.enableAutoSizeSavingToWeb();
	this.enableAutoSortingSavingToWeb();
};
/*
 *Author: Kevin He
 *Version Date: April 11, 2010
 *To improve grid setting DB performance, combine all DB activities in to one AJAX call instead of doing it mutiple times
 */
/*====================================START===================================================*/
dhtmlXGridObject.prototype.enableAutoSavingToDB = function(saveToWebUrl){
	this.saveToWebUrl = saveToWebUrl;
	this.attachEvent("onAfterCMove",function(){
		this.saveToDB("onAfterCMove");
	});
	this.attachEvent("onBeforeSorting",function(){
		var that=this;
		window.setTimeout(function(){
			that.saveToDB("onBeforeSorting");
		},1);
	});
	this.attachEvent("onColumnHidden",function(){
		this.saveToDB("onColumnHidden");
	});
	this.attachEvent("onResizeEnd",function(){
		this.saveToDB("onResizeEnd");
	});
};

dhtmlXGridObject.prototype.saveToDB=function(type){
	var colsOrder = "";
	var colsWidth = "";
	var colsSorting = "";
	var colsHidden = "";
	colsOrder = this.getColsOrder();
	colsWidth = this.getColsWidth();
	colsSorting = this.getColsSorting();
	colsHidden = this.getColsHidden();
	//-------------------------------------pass params to DB
	if(dBPersistentFlag){
		if(colsHidden==""){
			this.databaseStoredNoValue="true";
		}
		this.hiddenCols = colsHidden;
		var url = this.saveToWebUrl;
		var params = "&gridId="+this.entBox.id+"&colsOrder="+colsOrder+"&colsWidth="+colsWidth+"&colsSorting="+colsSorting+"&colsHidden="+colsHidden;
		//alert(params);
		doAjaxPost(url, params,"true");
	}
	
}
dhtmlXGridObject.prototype.getColsWidth=function(){
	if (this.cellWidthType=='px'){
		var tmpWidth=this.cellWidthPX.join(",");
		tmpWidth = "px:"+tmpWidth;
		tmpWidth = tmpWidth.replace(new RegExp(",0","gm"),",100");
	}
	else{
		var tmpWidth=this.cellWidthPC.join(",");
		tmpWidth = "percent:"+tmpWidth;
		tmpWidth = tmpWidth.replace(new RegExp(",0","gm"),",10");
	}
	return tmpWidth;
}
dhtmlXGridObject.prototype.getColsHidden=function(){
	var tmpHidden = "";
	var hs=[].concat(this._hrrar||[]);
	if (this._fake && this._fake._hrrar)
		for (var i=0;i < this._fake._cCount;i++)
			hs[i]=this._fake._hrrar[i]?"1":"";
			var hsString = hs.join(",").replace(/display:none;/g,"1");
	var hsArray = hsString.split(",");
	for (var i = 0; i < hsArray.length; i++)
	{
		if (hsArray[i]=="1"){
			if(tmpHidden == "")
				tmpHidden = i;
			else
				tmpHidden  = i+"," +tmpHidden; 
		}
	}
	return tmpHidden;
}
dhtmlXGridObject.prototype.getColsOrder=function(){
	return this.getOrder();
}
dhtmlXGridObject.prototype.getColsSorting=function(){
	return (this.getSortingState()||[]).join(",");
}
/*=======================================END==============================================================*/

dhtmlXGridObject.prototype.saveSizeToWeb=function(){
	//alert("PX"+this.cellWidthPX+"=PC"+this.cellWidthPC);
	if (this.cellWidthType=='px'){
		var z=this.cellWidthPX.join(",");
		z = "px:"+z;
	}
	else{
		var z=this.cellWidthPC.join(",");
		z = "percent:"+z;
	}
	//window.document.getElementById("tt").innerHTML = new String(this.cellWidthPX+"  " +this.cellWidthType);
	this.saveToWeb("curWidth",z);	
};

dhtmlXGridObject.prototype.saveHiddenColumnsToWeb=function(){
	var hiddenString = "";
	var hs=[].concat(this._hrrar||[]);
	if (this._fake && this._fake._hrrar)
		for (var i=0;i < this._fake._cCount;i++)
			hs[i]=this._fake._hrrar[i]?"1":"";
	
	var hsString = hs.join(",").replace(/display:none;/g,"1");
	var hsArray = hsString.split(",");
	for (var i = 0; i < hsArray.length; i++)
	{
		if (hsArray[i]=="1"){
			if(hiddenString == "")
				hiddenString = i;
			else
				hiddenString  = i+"," +hiddenString; 
		}
	}	
	this.hiddenCols= hiddenString;
	this.saveToWeb("hiddenCols",hiddenString);	
};

dhtmlXGridObject.prototype.saveSortingToWeb=function(){
	this.saveToWeb("sorting",(this.getSortingState()||[]).join(","));	
};

dhtmlXGridObject.prototype.saveOrderToWeb=function(){	
	/*
	 * Comment out by Kevin He 11/3/2010
	 *var hdrNameStr = "";
	 *for (var i = 1; i < this.hdrLabels.length; i++)
	 *{
	 *	hdrNameStr = hdrNameStr + "," + this.columnIds[i];
	 *}
	 *this.saveToWeb("colOrder", hdrNameStr);
	 */
	this.saveToWeb("colOrder",this.getOrder());
};


dhtmlXGridObject.prototype.saveToWeb=function(name, value) {	
	if(dBPersistentFlag){
		var url = this.saveToWebUrl;
		var params = "&gridId="+this.entBox.id+"&valueToSave="+name+"&theActualValue="+value;
		doAjaxPost(url, params,"true");
	}
	//right now this will be ultra annoying but won't break... once the server is in place you can un-comment the below code
	//to do the actual send instead of the alert...	
	//likely nothing has to be done with the response as long as it saved...
	
		//alert("This is where I would normally post to " + url +"with the following params: " + params);
	// useing doAjax instead of the Http block since doAjax was implemented already.
	/*
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}
	http.send(params);
	*/
};

/*
 *Author: Kevin He
 *Version Date: Nov 03, 2010
 *get and return the order from grid
 */
dhtmlXGridObject.prototype.getOrder=function(){	
	if (!this._c_order){
		this._c_order=[];
		var l=this._cCount;
		for (var i=0;i<l;i++)
			this._c_order[i]=i;
		};
	return this._c_order;
};

/*
 *Author: Kevin He
 *Version Date: Nov 03, 2010
 *Load size from the input value and move cloumns
 */
dhtmlXGridObject.prototype.loadOrder=function(value){
	var z=value;
	z=(z||"").split(",");
	if (z.length>1 && z.length<=this._cCount){
		for (var i=0;i<z.length;i++)
			if ((!this._c_order && z[i]!=i)||(this._c_order && z[i]!=this._c_order[i])){
				var t=z[i];
				if (this._c_order)
					for (var j=0;j<this._c_order.length;j++){
						if (this._c_order[j]==z[i])
						{t=j;break;}
				    };
				this.moveColumn(t*1,i);
			}
	}
};

/*
 *Author: Kevin He
 *Version Date: Nov 03, 2010
 *Load sorting setting from the input value and set the sorting and sort image the columns
 */
dhtmlXGridObject.prototype.loadSorting=function(value){
	var z = value;
	z=(z||"").split(",");
	if (z.length>1 && z[0]<this._cCount){
		this.sortRows(z[0],null,z[1]);
		this.setSortImgState(true,z[0],z[1]);
		this.s_col = z[0];
		this.a_direction = z[1];
	}else{
		this.sortRows(this.s_col,null,this.a_direction);
		this.setSortImgState(true,this.s_col,this.a_direction);
	}
};

/*
 * Author: Kevin He
 * Version Date: Nov 03, 2010
 * Load size from the input value and resize for each columns
 */
dhtmlXGridObject.prototype.loadSize=function(value){
		var z = value;
		z=(z||"").split(":")[1];
		if (z)
			this.initCellWidth=z.split(",");
		z = (z||"").split(":")[0];
		if ((z)&&(z.length)){
			if (!this._fake && this._hrrar)
				for (var i=0;i<z.length;i++)
					if ( this._hrrar[i])
						z[i]=0;
			if (this.cellWidthType=='px')
				this.cellWidthPX=z.split(",");
			else
				this.cellWidthPC=z.split(",");
		};
 	this.setSizes();

};
/*
 * Author: Kevin He
 * Version Date: Nov 03, 2010
 * Hid column
 */
dhtmlXGridObject.prototype.loadHiddenColumns=function(value){
	var tmp = "";
	var z=value;
	if(z == "")
		return false;
	var ar=(z||"").split(",");
	if (ar.length>this._cCount || !z)
		return false;
	for (var i=0;i < ar.length;i++){
		this.setColumnHidden(ar[i],true);
	}
	//alert("="+this._cCount+"tmp="+tmp);
	return true;
};
/*
 * Author: Kevin He
 * Version Date: Nov 11,2010
 * To get the sorting columns from the value
 */
dhtmlXGridObject.prototype.getSortingCol=function(value,defaultCol){
	var z = value;
	if(z == '')
    	return defaultCol;
	z=(z||"").split(",");
	return z[0];
};
/*
 * Author: Kevin He
 * Version Date: Nov 11,2010
 * To get the sorting direction from the value
 */
dhtmlXGridObject.prototype.getSortingDir=function(value,defaultDir){
	var z = value;
	if(z == '')
    	return defaultDir;
	z=(z||"").split(",");
	return z[1];
};
/*
 * Author: Kevin He
 * Version Date: Nov 11,2010
 * This is only used for grid with paging
 */
dhtmlXGridObject.prototype.loadPagingSorting=function(value,defaultCol){
	if(defaultCol == '')
		defaultCol = 0;
	var z = value;
	z=(z||"").split(",");
	if (z.length>1 && z[0]<this._cCount){
		this.sortIndex = z[0];
		this.a_direction = z[1];
	}else{
		this.sortIndex = defaultCol;
		this.a_direction = "asc";
	}
};
/*
 * Author: Kevin He
 * Version Date: Nov 11,2010
 * Get the sort column position from order based on the offset(grid.s_col).
 * Move column will change the order of column. However, the native sorting method stores the index of column 
 * We have to get the sort column from the order based on the offset.
 * Order before moving: 0,1,2,3,4,5,6,7,8  Sort 3,asc   get 2
 * Order after moving:  0,1,6,3,4,5,2,7,8  Sort 6,asc   still get 2
 */
dhtmlXGridObject.prototype.getSortColByOffset=function(){
	if(this.columnChanged==false){
		this.sortIndex = this.getSortingState()[0];
	}
	var offset = parseInt(this.sortIndex||"0");
	var z = this.getOrder()+"";
	z = (z||"").split(",");
	var col = z[offset];
	this.columnChanged = false;
	return col;
};
dhtmlXGridObject.prototype.getDefaltSortImagIndex=function(sortIndex,defaultSortIndex){
	if(sortIndex == null){
			return defaultSortIndex;
		}
		return sortIndex;
};
/*
 * hiddenCols will be used to store hiddenColumns that we just changed on the grid
 */
dhtmlXGridObject.prototype.hiddenCols ="";
dhtmlXGridObject.prototype.databaseStoredNoValue ="";