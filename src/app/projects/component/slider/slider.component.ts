import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() sliderInputValue: any;
  @Output() sliderEventTrigger: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  sliderClickEventTrigger(modelValue: any) {
    this.sliderEventTrigger.emit(modelValue);
  }
}
