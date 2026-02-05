import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
// 1. Используем относительный путь и импортируем только тип
import type { Schema } from '../amplify/data/resource'; 

// Генерируем клиент
const client = generateClient<Schema>();

export default function HomePage() {
  // 2. Теперь используем Product вместо Todo и добавляем ['type']
  const [products, setProducts] = useState<Schema['Product']['type'][]>([]);

  async function listProducts() {
    try {
      // 3. Вызываем list() для модели Product
      const { data } = await client.models.Product.list();
      setProducts(data);
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    }
  }

  useEffect(() => {
    listProducts();
  }, []);

  return (
    <main style={{ padding: '20px' }}>
      <h1>Магазин RetailStore 👋</h1>
      
      {products.length === 0 ? (
        <p>Товаров пока нет. База данных пуста.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> — ${product.price}
              <br />
              <small>{product.description}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}