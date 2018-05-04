import {JetView} from "webix-jet";
import {data1} from "models/data1";
import {categories} from "models/categories";

export default class WindowEdit extends JetView{
	config(){

		let form = {
			view:"form",
			elements:[{
				rows:[ 
					{view: "textarea", label:"Name", name:"Name"},
					{view: "textarea", label:"Year", name:"year"},
					{view: "textarea", label:"Author", name:"author"},
					{view:"combo", label:"Category", options:{data:categories}, name:"category"},
					{view: "textarea", label:"Text", name:"text"},
					{
						cols:[
							{},
							{
								view:"button",
								label:"Save",
								type:"form",
								click: () => { 
									let popForm = this.getRoot().queryView({view:"form"});
									let values = popForm.getValues();
									if(!popForm.validate()) return false;
									if(values.id){
										data1.updateItem(values.id, values);
									} else{
										data1.add(values);
									}
									this.hideFunction();
								}
							},
							{
								view:"button", 
								label:"Cancel", 
								click:() => {
									this.hideFunction();
								}
							},
						]
					}
				]
			}],
		};

		let pop = {
			view:"window",
			position:"center",
			head:"Edid", 
			width: 700,
			body: form
		};

		return pop;
	}
	init(){
		this.on(this.app, "dataEdit", (data) => {
			this.getRoot().queryView({view:"form"}).setValues(data);
		});
	}
	showWindow() {
		this.getRoot().show();
	}
	hideFunction(){
		let popForm = this.getRoot().queryView({view:"form"});
		popForm.clear();
		popForm.clearValidation();
		this.getRoot().hide();
		this.app.callEvent("dataEdit", [{}]);
	}
}

