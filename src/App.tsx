import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource'; 
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { ProductCreateForm } from './ui-components';

// Генерируем клиент
const client = generateClient<Schema>();

export default function App() {
  const [products, setProducts] = useState<Schema['Product']['type'][]>([]);

  async function listProducts() {
    try {
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
    <ThemeProvider>
      <Authenticator>
        {({ signOut, user }) => (
          <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h1>Магазин RetailStore 🚀</h1>
              <button onClick={signOut}>Выйти ({user?.signInDetails?.loginId})</button>
            </header>

            <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eee' }}>
              <h2>Добавить новый товар</h2>
              <ProductCreateForm onSuccess={listProducts} />
            </section>

            <section>
              <h2>Список товаров</h2>
              {products.length === 0 ? <p>Товаров нет</p> : (
                <ul>
                  {products.map((product) => (
                    <li key={product.id}>
                      <strong>{product.name}</strong> — ${product.price}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* ПРАВИЛЬНЫЙ ФУТЕР ДЛЯ REACT */}
            <footer style={{ marginTop: '50px', textAlign: 'center', opacity: 0.6 }}>
              <hr />
              <p>© 2026 RetailStore Workshop | Arch Linux</p>
            </footer>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}