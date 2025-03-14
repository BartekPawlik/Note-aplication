import React, { useState, useEffect } from "react";

const initialShopList = [
  {
    id: 123459,
    client: "Tom",
    name: "umbrela",
    price: 14.5,
    image: "https://i.pravatar.cc/48?u=499476",
  },
  {
    id: 123426,
    client: "Jerry",
    name: "knife",
    price: 11.5,
    image: "https://i.pravatar.cc/48?u=499472",
  },
  {
    id: 123451,
    client: "guy",
    name: "ball",
    price: 9.5,
    image: "https://i.pravatar.cc/48?u=499471",
  },
];

export default function App() {
  const [clients, setClients] = useState(initialShopList);
  const [selectedPartner, setSelectedPartner] = useState(null);

  function partnerDispaly(partner) {
    setSelectedPartner(partner);
    console.log(partner);
  }

  function handleShopClients(newItem) {
    setClients((client) => [...client, newItem]);
  }

  function handleUpdatePartner(updatePartner) {
    setClients((prev) =>
      prev.map((client) =>
        client.id === updatePartner.id ? updatePartner : client
      )
    );
    setSelectedPartner(updatePartner)
  }


  function removeClient(){
   if(selectedPartner) {
    setClients((prev) =>
    prev.filter((client)=> client.id !== selectedPartner.id))
   }
   setSelectedPartner(null)
  }
  return (
    <div className="App">
      <div className="sidebar">
        <ShopList
          client={clients}
          partnerdispaly={partnerDispaly}
          selectedPartner={selectedPartner}
        />
        <AddCustomer handleClients={handleShopClients} />
      </div>
      <UserPanel selectedPartner={selectedPartner} setPartner={handleUpdatePartner} removeclient={removeClient} />
    </div>
  );
}

function ShopList({ client, partnerdispaly, selectedPartner }) {
  return (
    <div className="shop-list">
      {client.map((shop) => (
        <ShopItem
          shop={shop}
          key={shop.id}
          partnerdispaly={partnerdispaly}
        />
      ))}
    </div>
  );
}

function ShopItem({ shop, partnerdispaly }) {
  return (
    <li onClick={() => partnerdispaly(shop)}>
      <img src={shop.image} alt={shop.name} />
      <div className="items-container">
        <h3>{shop.client}</h3>
        <h4>item name: {shop.name}</h4>
        <p>{shop.price}$</p>
      </div>
    </li>
  );
}

function AddCustomer({ handleClients }) {
  const [client, setClient] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();

    const newItem = {
      id,
      image,
      client,
      name,
      price,
    };

    handleClients(newItem);
    setClient("");
    setName("");
    setPrice("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>client name</label>
      <input value={client} onChange={(e) => setClient(e.target.value)} />
      <label>product</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>price</label>
      <input
        value={price}
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Image Url 🖼</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />
      <button>Add</button>
    </form>
  );
}

function UserPanel({ selectedPartner, setPartner, removeclient }) {
const [client, setClient] = useState(selectedPartner?.client || "")
const [name, setName] = useState(selectedPartner?.name || "")
const [price, setPrice] = useState(selectedPartner?.price || "")


React.useEffect(() => {
  if (selectedPartner) {
    setClient(selectedPartner.client);
    setName(selectedPartner.name);
    setPrice(selectedPartner.price);
  }
}, [selectedPartner]);




  function handleChanges(){
    const updated = {
      ...selectedPartner,
      client,
      name,
      price: parseFloat(price),
    };
    setPartner(updated);
  }



  if (!selectedPartner) return null
    return (
      <div className="user-panel">
        <label>user name</label>
        <input
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <label>Item</label>
        <input value={name}  onChange={(e) => setName(e.target.value)} />
        <label>Price</label>
        <input value={price}  onChange={(e) => setPrice(e.target.value)} />
        <button onClick={handleChanges}>change</button>
        <button onClick={removeclient}>delete</button>
      </div>
    );
}
