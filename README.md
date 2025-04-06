# PixelSetBobines

PixelSetBobines est une application web qui permet aux utilisateurs de découvrir des recommandations de films en fonction des jeux vidéo qu'ils aiment, et inversement. Grâce à l'intégration des API de **RAWG** et **TMDb**, le site propose des suggestions pertinentes et personnalisées, offrant ainsi une expérience unique aux passionnés de cinéma et de jeux vidéo.

## Fonctionnalités principales

- 🎮 **Recommandation de films à partir d'un jeu vidéo aimé**
- 🎬 **Recommandation de jeux vidéo à partir d'un film apprécié**
- 🔍 **Recherche de jeux vidéo et de films**
- ⭐ **Affichage des détails et notes des œuvres**
- 🔗 **Liens vers les plateformes de visionnage ou d'achat**

## Technologies utilisées

- **Frontend** : React, Vite, React Router, TailwindCSS
- **Backend** : Node.js, Express
- **API utilisées** :
  - [RAWG](https://rawg.io/apidocs) pour les jeux vidéo
  - [TMDb](https://developer.themoviedb.org/reference/intro/getting-started) pour les films
- **Autres outils** : Axios, dotenv

## Installation et exécution

1. **Cloner le projet**
   ```sh
   git clone https://github.com/votre-utilisateur/pixelsetbobines.git
   cd pixelsetbobines
   ```

2. **Configurer les variables d'environnement**
   - Créez un fichier `.env` à la racine du projet et ajoutez vos clés API :
     ```sh
     RAWG_API_KEY=VOTRE_CLE_RAWG
     TMDB_API_KEY=VOTRE_CLE_TMDB
     ```

3. **Installer les dépendances**
   ```sh
   npm install
   ```

4. **Lancer le serveur backend**
   ```sh
   cd backend
   node server.js
   ```

5. **Lancer le frontend**
   ```sh
   npm run dev
   ```

## Structure du projet

```
/ pixelsetbobines
│── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   ├── .env
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│── package.json
│── README.md
```

## Améliorations futures

- 🔥 **Affinage des recommandations** via des algorithmes plus avancés
- 🎭 **Ajout de genres et filtres personnalisés**
- 📊 **Analyse des tendances et suggestions dynamiques**

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à proposer des améliorations en ouvrant une **issue** ou une **pull request**.

---

💡 **PixelSetBobines, où cinéma et jeux vidéo se rencontrent !** 🎮🎬

