import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

	constructor() {
		super();
		this.state = {
			movies: [
				{ _id: 1, Title: 'Interstellar', Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", Genre: 'Sci-fi', Director: 'Christopher Nolan', ImagePath: './components/movie-jpeg/interstellar.jpeg' },
				{ _id: 2, Title: 'The Dark Knight', Description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', Genre: 'Action', Director: 'Christopher Nolan', ImagePath: './components/movie-jpeg/thedarkknight.jpeg' },
				{ _id: 3, Title: 'Spirited Away', Description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.", Genre: 'Animation', Director: 'Hayao Miyazaki', ImagePath: '../movie-jpeg/spiritedaway.jpeg' }
			],
			selectedMovie: null
		};
	}

	setSelectedMovie(newSelectedMovie) {
		this.setState({
			selectedMovie: newSelectedMovie
		});
	}

	render() {
		const { movies, selectedMovie } = this.state;


		if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

		return (
			<div className="main-view">
				{selectedMovie
					? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
					: movies.map(movie => (
						<MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
					))
				}
			</div>
		);
	}
}

export default MainView;