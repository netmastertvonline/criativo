module.exports = translateGenres = (genres) => {
  const translations = {
    'Action': 'Ação',
    'Action Epic': 'Épico de Ação',
    'Adventure': 'Aventura',
    'Animal Adventure': 'Aventura Animal',
    'Animation': 'Animação',
    'Body Horror': 'Terror Corporal',
    'Buddy Comedy': 'Comédia de Amigos',
    'Comedy': 'Comédia',
    'Comedy Romântica': 'Comédia Romântica',
    'Computer Animation': 'Animação Computadorizada',
    'Crime': 'Crime',
    'Dark Comedy': 'Comédia Negra',
    'Epic': 'Épico',
    'Fairy Tale': 'Conto de Fadas',
    'Feel-Good Romance': 'Romance Aconchegante',  // Adicionado
    'Horror': 'Terror',
    'Jukebox Musical': 'Musical Jukebox',
    'Medical Drama': 'Drama Médico',
    'Mystery': 'Mistério',
    'One-Person Army Action': 'Ação de Um Exército de Uma Pessoa',
    'Period Drama': 'Drama de Época',
    'Political Drama': 'Drama Político',
    'Prison Drama': 'Drama Prisional',
    'Psychological Thriller': 'Suspense Psicológico',
    'Romantic Comedy': 'Comédia Romântica',
    'Serial Killer': 'Assassino em Série',
    'Space Sci-Fi': 'Ficção Científica Espacial',
    'Splatter Horror': 'Terror Splatter',
    'Superhero': 'Super-herói',
    'Supernatural Fantasy': 'Fantasia Sobrenatural',
    'Suspense': 'Suspense',
    'Suspense Mystery': 'Mistério de Suspense',
    'Supernatural Horror': 'Terror Sobrenatural',
    'Teen Drama': 'Drama Adolescente',
    'Teen Horror': 'Terror Adolescente',
    'Teen Romance': 'Romance Adolescente',
    'Thriller': 'Suspense',
    'War Epic': 'Épico de Guerra'
  };

  return genres.map(genre => translations[genre] || genre);
};
