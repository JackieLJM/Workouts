function AddressBook(){
	var contacts=[];
	this.addContact=function(contact){
		contacts.push(contact);
	}
	this.getContact=function(index){
		return contacts[index];
	}

}
var address= new AddressBook();
console.log(address.addContact("xiaoming"));
console.log(address.getContact(0));