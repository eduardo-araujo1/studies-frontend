import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieCategoryComponent } from '../../components/movie-category/movie-category.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movies';
import { tmdbConfig } from '../../constants/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MovieCategoryComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent {

  movieService = inject(MovieService);
  popularMovies:any[]=[];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  bannerMovie!: Movie;
  tmdbConfig = tmdbConfig;
  public domSanitise=inject(DomSanitizer);

  ngOnInit() {
    this.loadPopularMovies();
    this.loadTopRatedMovies();
    this.loadNowPlayingMovies();
    this.loadUpcomingMovies();
  }

  private loadPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe({
      next: (result: any) => {
        console.log(result);
        this.popularMovies = result.results;
        if (this.popularMovies.length > 0) {
          this.bannerMovie = this.popularMovies[0];
          this.loadBannerMovieVideo(this.bannerMovie.id);
        }
      },
      error: (err) => {
        console.error('Error fetching popular movies', err);
      }
    });
  }

  private loadBannerMovieVideo(movieId: number): void {
    this.movieService.getMovieVideos(movieId).subscribe({
      next: (res: any) => {
        const youtubeVideo = res.results.find((x: any) => x.site === 'YouTube');
        if (youtubeVideo) {
          this.bannerMovie!.videoKey = youtubeVideo.key;
          console.log(this.bannerMovie);
        }
      },
      error: (err) => {
        console.error(`Error fetching video for movie ID: ${movieId}`, err);
      }
    });
  }

  private loadTopRatedMovies(): void {
    this.movieService.getTopRatedMovies().subscribe({
      next: (result: any) => {
        this.topRatedMovies = result.results;
      },
      error: (err) => {
        console.error('Error fetching top rated movies', err);
      }
    });
  }

  private loadNowPlayingMovies(): void {
    this.movieService.getNowPlayingMovies().subscribe({
      next: (result: any) => {
        this.nowPlayingMovies = result.results;
      },
      error: (err) => {
        console.error('Error fetching now playing movies', err);
      }
    });
  }

  private loadUpcomingMovies(): void {
    this.movieService.getUpcomingMovies().subscribe({
      next: (result: any) => {
        this.upcomingMovies = result.results;
      },
      error: (err) => {
        console.error('Error fetching upcoming movies', err);
      }
    });
  }
}