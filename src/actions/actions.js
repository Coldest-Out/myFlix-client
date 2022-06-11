export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

//Will attempt the below at a later date
//export const ADD_FAVMOVIE = 'ADD_FAVMOVIE';
//export const REM_FAVMOVIE = 'REM_FAVMOVIE';


export function setMovies(value) {
	return { type: SET_MOVIES, value };
}

export function setFilter(value) {
	return { type: SET_FILTER, value };
}

export function setUser(user) {
	return { type: SET_USER, user: user?.Username };
}

//Will attempt the below at a later date, just adding code now for future reference.
/*
export function addFavMovie(value) {
	return { type: ADD_FAVMOVIE, value };
}
*/

/*
export function remFavMovie(value) {
	return { type: REM_FAVMOVIE, value };
}
*/