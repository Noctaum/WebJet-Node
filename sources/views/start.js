import {JetView} from "webix-jet";

export default class Start extends JetView{
	config(){

		let header =  { 
			view: "toolbar",
			elements: [
				{
					view: "button", 
					type: "icon", 
					icon: "bars", 
					width: 37, 
					align: "left", 
					click: ()=>{
						this.getRoot().queryView({view:"sidebar"}).toggle();
					}
				},
				{ view: "label", label: "My App"},
			]
		};

		let sidebar = { 
			view: "sidebar",
			data:[
				{id:"table", icon: "film", value: "Films"},
				{id:"table2", icon: "users", value: "Users"},
				{id:"table3", icon: "list-alt", value: "List"},
				{id:"settings", icon: "cogs", value: "Setting"},
			],
			on:{
				onAfterSelect: (id)=>{
					let sidebar = this.getRoot().queryView({view:"sidebar"});
					this.show(`../start/${sidebar.getItem(id).id}`);
				}
			}
		};

		return {
			rows:[
				header,
				{cols:[
					sidebar,
					{$subview:true}
				]}
			]
		};

	}
	ready(){
		let sidebar = this.getRoot().queryView({view:"sidebar"});
		sidebar.select(sidebar.getFirstId());
	}
}