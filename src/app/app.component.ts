import { Component, Input, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() termoPesquisa: any = '';

  car = {} as Car;
  cars!: Car[];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  // defini se um carro será criado ou atualizado
  saveCar(form: NgForm) {
    if (this.car.id !== undefined) {
      this.carService.updateCar(this.car).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.carService.saveCar(this.car).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getCars() {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  // deleta um carro
  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(() => {
      this.getCars();
    });
  }

  // copia o carro para ser editado.
  editCar(car: Car) {
    this.car = { ...car };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }


  filtrarNome() {
    if (this.termoPesquisa.length > 2) { //filtrar apartir do segundo digito
      this.cars = this.cars.filter((m: any) => m.model.toLowerCase().includes(this.termoPesquisa.toLowerCase()))
    }else {
      this.carService.getCars().subscribe((cars: Car[]) => {
        this.cars = cars;
      })
    }

    console.log(this.termoPesquisa);
    console.log(this.termoPesquisa.length);
}
}
