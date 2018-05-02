import {JetView} from "webix-jet";
import {data1} from "models/data1";
import {categories} from "models/categories";
import {files} from "models/files";

export default class DataTable extends JetView{
	config(){
	
		//Filter for first 3 point og grid
		let filter = (nameProp)=>{
			this.$$("dataTab").filter((data)=>{
				let value = this.$$(nameProp).getText();
				return data[nameProp] == value;
			},"",true);
			this.$$(nameProp).disable();
		};

		let grid = {
			view:"toolbar", elements:[
				//Select for Name
				{view:"label", label:"Select"},
				{view:"richselect", id:"Name", suggest:{
					view:"gridsuggest",
					textValue:"Name",
					body:{
						autoConfig:true,
						columns:[{id:"Name"}],
						data:data1
					}
				},
				on:{ onChange:()=>filter("Name") }
				},
				//Select for year
				{view:"richselect", id:"year", suggest:{
					view:"gridsuggest",
					textValue:"year",
					body:{
						autoConfig:true,
						columns:[{id:"Name"},{id:"year"}],
						data:data1,
					}
				},
				on:{ onChange:()=>filter("year") }
				},
				//Select for author
				{view:"richselect", id:"author", suggest:{
					view:"gridsuggest",
					textValue:"author",
					body:{
						autoConfig:true,
						columns:[{id:"Name"},{id:"author"}],
						data:data1
					}
				},
				on:{ onChange:()=>filter("author") }
				},
				//Select for category
				{view:"richselect", id:"categor", suggest:{
					view:"gridsuggest",
					textValue:"value",
					body:{
						autoConfig:true,
						columns:[{id:"value"}],
						data:categories
					}
				},
				on:{
					onChange:(category)=>{
						this.$$("dataTab").filter((data)=>{
							return data.category == category;
						},"",true);
						this.$$("categor").disable();
					}
				}
				},
			]
		};

		//Table with films, it's for grid-filter
		let datatable = {
			view: "datatable",
			id:"dataTab",
			datatype:"json",
			select:true,
			columns:[
				{id:"Name", header:"Name", fillspace:2},
				{id:"year", header:"Year", fillspace:2},
				{id:"author", header:"Some information", fillspace:1},
				{id:"category", header:"Category", options:categories,fillspace:1},
			],
		};

		//Button refresh grid-filter
		let refreshBut = {
			view: "button", 
			label: "Refresh",
			click:()=>{
				this.$$("dataTab").filterByAll();
				this.$$("dataTab").filter(()=>{
					return 1;
				});
				this.$$("Name").enable();
				this.$$("year").enable();
				this.$$("author").enable();
				this.$$("categor").enable();
			}
		};

		//List for delete films
		let multicombo = {
			labelPosition: "top",
			view:"multicombo", 
			label:"Delete films", 
			id:"multi1", 
			suggest: {    
				body:{
					data:data1,
					template:"#Name#"
				}
			}
		};

		//Button for delete films
		let delBut = {
			view: "button", 
			label: "Delete",
			click:()=>{
				let val = this.$$("multi1").getValue();
				val = val.split(",");
				let length = val.length;
				for(let i = 0; i<length; i++){
					data1.remove(val[i]);
				}
				this.$$("multi1").refresh();
			}
		};

		//Selecor for film
		let select = {
			labelPosition: "top",
			view:"richselect", 
			label:"Film for picture", 
			id:"select",
			name:"filmName",
			suggest:{
				view:"gridsuggest",
				textValue:"Name",
				body:{
					columns:[{id:"Name"},{id:"year"},{id:"author"}],
					data:data1
				}
			},
		};

		//Button for upload picture
		let upload = {
			view:"uploader", 
			label:"Change picture",
			autosend:false, 
			multiple:false,
			id:"uploadImg",
			accept:"image/jpeg, image/png",
			upload:"http://localhost:8096/files",
			on:{
				onAfterFileAdd:(upload)=>{
					let file = upload.file;
					let reader = new FileReader(); 
					reader.onload = (event) => {
						this.$$("img").setValues(event.target.result);
					};    
					reader.readAsDataURL(file);
					return false;
				}
			}
		};

		//Place for upload picture
		let templForPict = { 
			template:(a)=>{return `
							<div class='imageWrape'>
								<img class='image' src=${typeof(a) !== "object" ? a :"http://emptyensemble.com/wp-content/themes/emptyensemble2015/assets/images/empty_ensemble_empty_set_logo.png"}>
							</div>
						`;},
			id:"img",
		};

		//Button for upload pict to server
		let upToServBut = {
			view: "button", 
			label: "Upload to server",
			click:()=>{
				this.$$("uploadImg").files.data.each((file)=>{
					file.formData = {name:this.$$("select").getText()};
					this.$$("uploadImg").send(file.id);
				});
				this.$$("img").setValues({});
			}
		};

		let partOfUpload = {
			id:"partOfUpload",
			rows:[
				select,
				upload,
				upToServBut,
				templForPict,
			]
		};

		let partOfTable = {
			id:"partOfTable",
			rows:[
				grid,
				datatable,
				refreshBut,
			]
		};

		let partOfDelete = {
			id:"partOfDelete",
			rows:[
				multicombo,
				delBut,
			]
		};

		//Left side of form
		let left = {
			rows:[
				{cols:[
					{ view:"checkbox", id:"hideUpload", label:"Show upload", value:1,labelWidth:100,
						click:()=>{
							let firstPart = this.$$("partOfUpload");
							this.$$("hideUpload").getValue() ? firstPart.show() : firstPart.hide();
						}
					},
					{ view:"checkbox", id:"hideTable", label:"Show table", value:1,labelWidth:100,
						click:()=>{
							let secondPart = this.$$("partOfTable");
							this.$$("hideTable").getValue() ? secondPart.show() : secondPart.hide();
						}
					},
					{ view:"checkbox", id:"hideDelete", label:"Show delete", value:1,labelWidth:100,
						click:()=>{
							let thirdPart = this.$$("partOfDelete");
							this.$$("hideDelete").getValue() ? thirdPart.show() : thirdPart.hide();
						}
					}	
				]},
				partOfUpload
			]
		};

		//Right side of form
		let right = {
			rows:[
				partOfTable,
				partOfDelete
			]
		};

		let boilerplate = {
			view:"form",
			id:"form",
			elements:[
				{cols:[left, right]}
			]
		};

		return boilerplate;
	}

	init(){
		this.$$("dataTab").sync(data1);
		this.$$("multi1").getPopup().getList().sync(this.$$("dataTab").data);
	}
}

