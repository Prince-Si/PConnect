import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MongoDBTest() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://192.168.0.106:5000/Mongo/items');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://192.168.0.106:5000/Mongo/items', { name: newItem });
      fetchItems();
      setNewItem('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Item"
        value={newItem}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Add Item</button>
    </div>
  );
}

export default MongoDBTest;
