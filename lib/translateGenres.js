function translateGenre(genre) {
    const translations = {
      'Dark Comedy': 'Comédia Sombria',
      'Satire': 'Sátira',
      'True Crime': 'Crime Real',
      'Biography': 'Biografia',
      // Adicione outras traduções conforme necessário
    };
    return translations[genre] || genre; // Retorna a tradução ou o gênero original caso não haja tradução.
  }