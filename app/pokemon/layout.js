export default function PokemonLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%', backgroundColor: '#f5deb3' }}>
        <h2>Lista Pokémonów</h2>
        {children}
      </div>
      <div style={{ width: '80%', backgroundColor: '#add8e6' }}>
        <p style={{ backgroundColor: '#fce5cd', padding: '10px' }}>
          TU MA BYĆ WYSZUKIWARKA I FILTERBAR LIMIT I TU MAJA POKAZYWAĆ SIĘ POKEMONY
        </p>
      </div>
    </div>
  );
}
