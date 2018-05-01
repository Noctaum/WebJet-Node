import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){
	
		//Table
		let datatable = {
			view: "datatable",
			datatype:"json",
			id:"table2",
			select:true,
			editable:true,
			editaction:"dblclick",
			datafetch:10,
			loadahead:30,
			columns:[
				{id:"firstName", editor:"text", header: ["Name" ,{content:"serverFilter"}], sort:"server",fillspace:2},
				{id:"secondName", editor:"text", header: ["Surname" ,{content:"serverFilter"}], sort:"server",fillspace:2},
				{id:"text", editor:"text", header: ["Some information" ,{content:"serverFilter"}], sort:"server",fillspace:1},
				{id:"value", editor:"text", header: ["More" ,{content:"serverFilter"}], sort:"server",fillspace:1},
			],
			save:"rest->http://localhost:8096/data2",
			on:{
				onAfterEditStop:()=>{
					let values = this.$$("table2").getSelectedItem();
					this.$$("table2").updateItem(values.id, values);
				}
			}
		};

		return  datatable;
	}
	
	init(){
		this.$$("table2").load("http://localhost:8096/data2");
	}
}

