import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CarrosService } from './Carros.service';
import { Carro } from './Carro';

@Component({
  selector: 'app-Carros',
  templateUrl: './Carros.component.html',
  styleUrls: ['./Carros.component.css']
})
export class CarrosComponent implements OnInit {
  displayedColumns: string[] = ['placa', 'chassi', 'renavan', 'modelo', 'marca', 'ano', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  selectedCarro: Carro = new Carro();
  loading = false;

  constructor(public CarroService: CarrosService) {
  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.CarroService.getCarros();
    this.dataSource.data = data;
    this.loading = false;
  }

  async updateCarro() {
    if (this.selectedCarro.id !== undefined) {
      await this.CarroService.updateCarro(this.selectedCarro);
    } else {
      await this.CarroService.createCarro(this.selectedCarro);
    }
    this.selectedCarro = new Carro();
    await this.refresh();
  }

  editCarro(Carro: Carro) {
    this.selectedCarro = Carro;
  }

  clearCarro() {
    this.selectedCarro = new Carro();
  }

  async deleteCarro(Carro: Carro) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the Carro ${Carro.name}. This cannot be undone.`)) {
      this.CarroService.deleteCarro(Carro.id);
    }
    await this.refresh();
  }
}