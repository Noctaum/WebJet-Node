import {JetView} from "webix-jet";
import {data1} from "models/data1";
import {categories} from "models/categories";

export default class DataTable extends JetView{
	config(){
	

		let list = {
			view:"list",
			id:"list",
			select:true,
			on:{
				onAfterSelect: ()=> {
					this.$$("table3").filter((data)=>{
						let values = this.$$("list").getSelectedItem();
						return data.category == values.id;
					});
				}
			}
		};

		let datatable = {
			view: "datatable",
			id:"table3",
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
					let values = this.$$("table3").getSelectedItem();
					this.$$("table3").updateItem(values.id, values);
					this.$$("wer").setValues(values);
				},
				onAfterSelect: ()=> {
					let values = this.$$("table3").getSelectedItem();
					this.$$("wer").setValues(values);
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
			gravity:3,
			id:"wer",
			template:templ,
		};

		return  {cols:[list, datatable, form]};
	}
	
	init(){
		this.$$("table3").sync(data1);
		this.$$("list").sync(categories);
	}
}

