import React, { useEffect, useState } from 'react';

function App({ tg }) {
  const [params, setParams] = useState({});

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setParams({
      token: search.get('token'),
      user_id: search.get('user_id'),
      // ... другие параметры, если надо
    });
  }, []);

  // Здесь можно сделать fetch на свой сервер для генерации карты
  // по token/user_id и отрисовать результат

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Ваша полная астрологическая карта</h1>
      <p>Параметры: {JSON.stringify(params)}</p>
      {/* Ваши компоненты визуализации */}
    </div>
  );
}

export default App;
