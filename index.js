const contactsOperation = require("./contacts");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list": {
      const allContacts = await contactsOperation.listContacts();
      console.log(allContacts);
      break;
    }
    case "get": {
      const contact = await contactsOperation.getContactById(id);
      if (!contact) {
        throw new Error(`There is no contact with id ${id}`);
        return;
      }
      console.log(contact);
      break;
    }
    case "add": {
      const contact = await contactsOperation.addContact(name, email, phone);
      console.log(contact);
      break;
    }
    case "remove": {
      const contact = await contactsOperation.removeContact(id);
      if(!contact){
        throw new Error(`There is no contact with id ${id}`);
        return;
      }
      console.log(contact);
      break;
    }
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// invokeAction({ action: "list" });
// invokeAction({ action: "get" });
// invokeAction({
//   action: "add",
//   name: "New Member",
//   email: "nec@Nulla.com",
//   phone: "(000) 000-00-00",
// });
// const idx = "17f4f86a-cbbf-4a36-8a76-899646f31f04";
// invokeAction({ action: "remove", id: idx });

invokeAction(options);
