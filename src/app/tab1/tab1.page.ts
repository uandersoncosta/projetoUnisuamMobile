import { Component, OnInit } from '@angular/core';
import {
  ThemoviedbService,
  TrendingAllItem,
} from '../projects/api/service/themoviedb.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  sliderContainer: any = [];
  constructor(private service: ThemoviedbService) {}

  ngOnInit(): void {
    this.initializesSliderContainer();
  }

  initializesSliderContainer() {
    this.service
      .getTrendingAll()
      .subscribe((response: { results: TrendingAllItem[] }) => {
        response.results.forEach((trendingAll: TrendingAllItem) => {
          this.sliderContainer.push({
            id: trendingAll.id,
            title: trendingAll.title,
            image: ('http://image.tmdb.org/t/p/original/' + trendingAll.backdrop_path),
            posterPath: ('http://image.tmdb.org/t/p/original/' + trendingAll.poster_path) ,
            modelItem: trendingAll,
          });
        });
      });
  }
}
