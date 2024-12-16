'use client';

import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((id) => (
            <li key={id}>Pokémon ID: {id}</li>
          ))}
        </ul>
      ) : (
        <p>You haven't added any Pokémon to your favorites yet.</p>
      )}
    </div>
  );
}
