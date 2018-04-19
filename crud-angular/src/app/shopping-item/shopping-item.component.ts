import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';


@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})
export class ShoppingItemComponent implements OnInit {
	shoppingListItem: Item[] = [];
	selectedItem: Item;
	toggleForm: boolean = false;

  constructor(private dataService: DataService) { }

	getItems() {
		this.dataService.getShoppingItems()
			.subscribe(items => {
				this.shoppingListItem = items;
				console.log(this.shoppingListItem[0]._id);
			});
	}

	addItem(form){
		let newItem: Item = {
			itemName: form.value.itemName,
			itemQuantity: form.value.itemQuantity,
			itemBought: false
		}

		this.dataService.addShoppingItem(newItem)
			.subscribe(item => {
				console.log(item);
				this.getItems();
			});
	}

	deleteItem(id){
		this.dataService.deleteShoppingItem(id)
			.subscribe(data => {
				console.log(data);
				if (data.n == 1) {
					for(let i=0; i<this.shoppingListItem.length; i++) {
						if (this.shoppingListItem[i]._id == id) {
							this.shoppingListItem.splice(i, 1);
						}
					}
				}
			});
	}

	showEditForm(item){
		this.selectedItem = item;
		this.toggleForm = !this.toggleForm;
	}

	editItem(form){
		let newItem: Item = {
			_id:this.selectedItem._id,
			itemName: form.value.itemName,
			itemQuantity: form.value.itemQuantity,
			itemBought: this.selectedItem.itemBought
		}

		this.dataService.updateShoppingItem(newItem)
			.subscribe(result => {
				console.log("Original Item was: " + result.itemQuantity);
				this.getItems();
			});
		this.toggleForm = !this.toggleForm;
	}

	updatedItemCheckbox(item){
		item.itemBought = !item.itemBought;
		this.dataService.updateShoppingItem(item)
			.subscribe(result => {
				console.log("Original checkbox value: " + result.itemBought);
				this.getItems();
			});
	}

  ngOnInit() {
	  this.getItems();
  }

}
