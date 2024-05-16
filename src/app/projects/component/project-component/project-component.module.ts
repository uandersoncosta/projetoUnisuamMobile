import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { SliderComponent } from '../slider/slider.component';
import { ModelPageComponent } from '../model-page/model-page.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CardComponent, SliderComponent, ModelPageComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [CardComponent, SliderComponent, ModelPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectComponentModule {}
