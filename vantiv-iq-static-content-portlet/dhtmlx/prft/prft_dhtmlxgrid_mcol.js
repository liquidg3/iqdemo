/*
 * Author: Mike Altieri   mike.altieri@perficient.com
 * 
 * Copyright Perficient Inc. http://www.perficient.com
 * 
 * This is an extension of dhtmlxgrid_mcol.js and requires dhtmlxgrid_mcol.js to work
 * 
 */

//based off of DHTMLX LTD. v.2.6 build 100722

dhtmlXGridObject.prototype._processAllArrays = function(oldInd,newInd,vals){
	var ars=["hdrLabels","colsVisibilityLocked","initCellWidth","cellType","cellAlign","cellVAlign","fldSort","columnColor","_hrrar","_c_order"];
	if (this.cellWidthPX.length)
		ars.push("cellWidthPX");
	if (this.cellWidthPC.length)
		ars.push("cellWidthPC");
	if (this._col_combos)
		ars.push("_col_combos");
	if (this._mCols)
		ars[ars.length]="_mCols";
	if (this.columnIds)
		ars[ars.length]="columnIds";
	if (this._maskArr)
		ars.push("_maskArr");
	if (this._drsclmW)
		ars.push("_drsclmW");
	if (this.clists)
		ars.push("clists");
	if (this._validators && this._validators.data)
		ars.push(this._validators.data);
	ars.push("combos");
	if (this._customSorts)
		ars.push("_customSorts");
	if (this._aggregators)
		ars.push("_aggregators");
	var mode=(oldInd<=newInd);
	if (!this._c_order){
		this._c_order=new Array();
		var l=this._cCount;
		for (var i=0;i<l;i++)
			this._c_order[i]=i;
	};
	for (var i=0;i<ars.length;i++){
		var t=this[ars[i]]||ars[i];if (t){
			if (mode){
				var val=t[oldInd];
				for (var j=oldInd;j<newInd;j++)
					t[j]=t[j+1];
				t[newInd]=val;
			}else {
				var val=t[oldInd];
				for (var j=oldInd;j>(newInd+1);j--)
					t[j]=t[j-1];
				t[newInd+1]=val;
			};
			if (vals)
				t[newInd+(mode?0:1)]=vals[i];
		}
	}
};