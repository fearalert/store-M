import React from "react";

const ContactsList: React.FC = () => {
  const contacts = [
    "Rohan Dhakal",
    "John Doe",
    "Harry Prasad",
    "Surya Binayak",
    "Salla Ghari",
    "Baluwa Tar",
  ];

  return (
    <section className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Contact</h2>
      <ul className="space-y-2">
        {contacts.map((contact, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border-b"
          >
            <p>{contact}</p>
            <button className="text-accent-blue">Add</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContactsList;
