import {JetView} from "webix-jet";
import {data1} from "models/data1";
import {categories} from "models/categories";
import WindowEdit from "views/window";

export default class DataTable extends JetView{
	config(){
	
		let header =  { 
			view: "toolbar",
			elements: [
				{ view: "label", label: "My App"},
				{
					view: "button", 
					label: "экспорт в excel",
					click:()=>{
						webix.toExcel(this.getRoot().queryView({view:"datatable"}));
					}
				},
				{
					view: "button", 
					label: "Обновление",
				},
			]
		};
		//Table
		let datatable = {
			view: "datatable",
			datatype:"json",
			select:true,
			columns:[
				{id:"Name", header: ["Name" ,{content:"textFilter"}], sort:"string",fillspace:2},
				{id:"year", header: ["Year" ,{content:"numberFilter"}], sort:"int",fillspace:2},
				{id:"author", header: ["Some information" ,{content:"textFilter"}], sort:"string",fillspace:1},
				{id:"category", header: ["Category" ,{content:"selectFilter"}], sort:"string", options:categories,fillspace:1},
			],
			on:{
				onAfterSelect: ()=> {
					let datatable = this.getRoot().queryView({view:"datatable"});
					let values = datatable.getSelectedItem();
					this.app.callEvent("dataEdit", [values]);
					this._jetPopup.showWindow();
				}
			}
		};

		return {rows:[header, datatable]};
	}
	
	init(view){
		this._jetPopup = this.ui(WindowEdit);
		view.queryView({view:"datatable"}).sync(data1);
	}
}

