import {JetView} from "webix-jet";
import {data1} from "models/data1";
import {categories} from "models/categories";

export default class DataTable extends JetView{
	config(){
	

		let list = {
			view:"list",
			select:true,
			on:{
				onAfterSelect: ()=> {
					this.getRoot().queryView({view:"datatable"}).filter((data)=>{
						let values = this.getRoot().queryView({view:"list"}).getSelectedItem();
						return data.category == values.id;
					});
				}
			}
		};

		let datatable = {
			view: "datatable",
			datatype:"json",
			select:true,
			editable:true,
			gravity: 3,
			editaction:"dblclick",
			columns:[
				{id:"Name", editor:"text", header:"Name",fillspace:2},
				{id:"year", editor:"text", header:"Year",fillspace:1},
				{id:"author", editor:"text", header:"Some information",fillspace:2},
				{id:"category", editor:"combo", header:"Category", options:categories, fillspace:1},
			],
			on:{
				onAfterEditStop:()=>{
					let datatable = this.getRoot().queryView({view:"datatable"});
					let values = datatable.getSelectedItem();
					datatable.updateItem(values.id, values);
					this.getRoot().queryView({view:"template", name:"review"}).setValues(values);
				},
				onAfterSelect: ()=> {
					let values = this.getRoot().queryView({view:"datatable"}).getSelectedItem();
					this.getRoot().queryView({view:"template", name:"review"}).setValues(values);
				}
			}
		};

		let templ = (data) =>{
			let category = data.category; 
			return `
				<section>
					<div><h2>${data.Name || "empty"}</h2></div>
					<div>Year: ${data.year || "empty"}</div>
					<div>Author: ${data.author || "empty"}</div>
					<div>Category: ${category ? categories.getItem(category).value : "empty"}</div>
					<article>About: ${data.text || "empty"}</article>
				</section>
			`;
		};

		let form =
		{	
			view:"template",
			name:"review",
			gravity:3,
			template:templ,
		};

		return  {cols:[list, datatable, form]};
	}
	
	init(view){
		view.queryView({view:"datatable"}).sync(data1);
		view.queryView({view:"list"}).sync(categories);
	}
}

