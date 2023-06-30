const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		people: [],
		starships: [],
		planets: [],
		likes: [],
		detailCharacter: {},
		detailPlanet: {},
	  },
	  actions: {
		fetchInitialData: async () => {
		  const SWAPI_TECH_URL = "https://www.swapi.tech/api";
  
		  const peopleUrl = `${SWAPI_TECH_URL}/people`;
		  const planetsUrl = `${SWAPI_TECH_URL}/planets`;
		  const starshipsUrl = `${SWAPI_TECH_URL}/starships`;
  
		  const localData = window.localStorage.getItem("starwars");
		  const likes = window.localStorage.getItem("likes");
  
		  if (!localData) {
			const fetchData = (url) =>
			  fetch(url)
				.then((data) => data.json())
				.then((json) => json.results);
  
			const planetsPromise = fetchData(planetsUrl);
			const peoplePromise = fetchData(peopleUrl);
			const starshipsPromise = fetchData(starshipsUrl);
  
			const [planets, people, starships] = await Promise.all([
			  planetsPromise,
			  peoplePromise,
			  starshipsPromise,
			]);
  
			setStore({
			  planets,
			  people,
			  starships,
			});
  
			return window.localStorage.setItem(
			  "starwars",
			  JSON.stringify({
				planets,
				people,
				starships,
			  })
			);
		  }
  
		  setStore({
			...JSON.parse(localData),
			likes: likes ? JSON.parse(likes) : [],
		  });
		},
		fetchDetailData: async (type, id) => {
		  const API_URL = process.env.SWAPI_TECH_URL;
		  const planetUrl = `${API_URL}/${type}/${id}`;
  
		  fetch(planetUrl)
			.then((data) => data.json())
			.then((json) =>
			  setStore({
				detailCharacter: {
				  ...json.result.properties,
				  description: json.result.description,
				  uid: json.result.uid,
				},
			  })
			);
		},
		fetchPlanetData: async (id) => {
		  const API_URL = process.env.SWAPI_TECH_URL;
		  const planetUrl = `${API_URL}/planets/${id}`;
  
		  fetch(planetUrl)
			.then((data) => data.json())
			.then((json) =>
			  setStore({
				detailPlanet: {
				  ...json.result.properties,
				  description: json.result.description,
				  uid: json.result.uid,
				},
			  })
			);
		},
		fetchPersonData: async (id) => {
		  const API_URL = process.env.SWAPI_TECH_URL;
		  const planetUrl = `${API_URL}/people/${id}`;
  
		  fetch(planetUrl)
			.then((data) => data.json())
			.then((json) =>
			  setStore({
				detailPerson: {
				  ...json.result.properties,
				  description: json.result.description,
				  uid: json.result.uid,
				},
			  })
			);
		},
		fetchStarshipData: async (id) => {
		  const API_URL = process.env.SWAPI_TECH_URL;
		  const starshipUrl = `${API_URL}/starships/${id}`;
  
		  fetch(starshipUrl)
			.then((data) => data.json())
			.then((json) =>
			  setStore({
				detailStarship: {
				  ...json.result.properties,
				  description: json.result.description,
				  uid: json.result.uid,
				},
			  })
			);
		},
		cleanDetailView: () => {
		  setStore({ detailCharacter: {} });
		},
		addNewLikedElement: (elementToAdd) => {
		  const likes = getStore().likes;
		  const updatedLikes = [...likes, elementToAdd];
		  window.localStorage.setItem("likes", JSON.stringify(updatedLikes));
		  setStore({ likes: updatedLikes });
		},
		removeLikedElement: (id) => {
		  const likes = getStore().likes;
		  const filtered = likes.filter((element) => element.id !== id);
		  window.localStorage.setItem("likes", JSON.stringify(filtered));
		  setStore({ likes: filtered });
		},
		isLikedElement: (id) => {
		  const likes = getStore().likes;
		  const likesId = likes.map((element) => element.id);
		  return likesId.includes(id);
		},
	  },
	};
  };
  
  export default getState;