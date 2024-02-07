import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur === friend ? null : friend));
    setShowAddFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <Friendslist
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
          friends={friends}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function Friendslist({ onSelection, friends, selectedFriend }) {
  // const friends = initialFriends;
  return friends.map((friend) => (
    <Friend
      onSelection={onSelection}
      friend={friend}
      key={friend.id}
      selectedFriend={selectedFriend}
    />
  ));
}

function Friend({ onSelection, friend, selectedFriend }) {
  const isSelected = selectedFriend === friend;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {" "}
          {friend.name} own you {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {selectedFriend === friend ? "close" : "Selected"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const newFriend = {
      name,
      image,
      balance: 0,
      id: `${image}=?${id}`,
    };
    onAddFriend(newFriend);

    setImage("https://i.pravatar.cc/48");
    setName("");
  }
  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>👩‍🚀 {name}</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      ></input>
      <label>🖼{image} </label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bil with {selectedFriend.name}</h2>

      <label>🧧 {selectedFriend.name} value</label>
      <input type="text"></input>

      <label>💸 Your expenses</label>
      <input type="text"></input>

      <label>🎉 X expense</label>
      <input type="text" disabled></input>

      <label>
        {" "}
        <h2></h2>who is paying the bill
      </label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
