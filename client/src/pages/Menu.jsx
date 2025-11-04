import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import Cart from '../components/Cart';
import '../styles/layout.css';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [cart, setCart] = useState([]);

  const defaultItems = [
    { _id: '1', name: 'Coffee', price: 80, tags: ['hot', 'drink'], imageUrl: 'https://etimg.etb2bimg.com/photo/113047605.cms' },
    { _id: '2', name: 'Sandwich', price: 150, tags: ['veg', 'baked'], imageUrl: 'https://vaya.in/recipes/wp-content/uploads/2018/06/Club-sandwich.jpg' },
    { _id: '3', name: 'Ice cream', price: 110, tags: ['cold', 'dessert'], imageUrl: 'https://blog.swiggy.com/wp-content/uploads/2025/02/Modern-Variations-of-Ice-Cream-1024x538.webp' },
    { _id: '4', name: 'Burger', price: 190, tags: ['nonveg', 'high-calories'], imageUrl: 'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/09/beef-burger.jpg' },
    { _id: '5', name: 'French Fries', price: 70, tags: ['snack', 'crispy'], imageUrl: 'https://blog.swiggy.com/wp-content/uploads/2025/01/Image-1_-French_fries_1-1024x538.png' },
  ];

  const load = async () => {
    try {
      const { data } = await api.get('/items', { params: { q } });
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading items:', err);
      setItems([]);
    }
  };

  useEffect(() => { load(); }, [q]);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((p) => p._id === item._id);
      if (found) return prev.map(p => p._id === item._id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const displayItems = useMemo(() => {
    const source = items.length ? items : defaultItems;
    if (!q.trim()) return source;
    const needle = q.trim().toLowerCase();
    return source.filter(it =>
      it.name.toLowerCase().includes(needle) ||
      (it.tags || []).some(t => t.toLowerCase().includes(needle))
    );
  }, [items, q]);

  return (
    <div className="container grid-2">
      <div className="col">
        <div className="toolbar">
          <SearchBar value={q} onChange={setQ} />
        </div>

        <div className="grid">
          {displayItems.map((it) => (
            <ItemCard key={it._id} item={it} onAdd={addToCart} />
          ))}
          {!displayItems.length && (
            <div className="muted">No items found for "{q}"</div>
          )}
        </div>
      </div>

      <Cart cart={cart} setCart={setCart} />
    </div>
  )
}
