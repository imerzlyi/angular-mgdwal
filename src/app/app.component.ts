import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  n: number = 4;
  m: number = 3;
  nRange: number[] = [];
  mRange: number[] = [];
  matrix: number[][] = [];
  matrix2: number[][] = [];

  xx: number[] = [];
  xs: number[] = [];
  xs2: number[] = [];

  ss1: number;
  ss2: number;

  df: number;
  ds: number;

  k1: number;
  k2: number;

  f: number;

  onClick(): void {
    this.gen();
  }

  ngOnInit(): void {
    this.gen();
  }

  gen(): void {
    this.nRange = Array(this.n).fill(0).map((x,i)=>i);
    this.mRange = Array(this.m).fill(0).map((x,i)=>i);
    this.matrix = []
    this.matrix2 = []
    for (let i = 0; i < this.n; i++) {
      this.matrix.push(Array(this.m).fill(0));
      this.matrix2.push(Array(this.m).fill(0));
    }
  }

  solve(): void {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        this.matrix2[i][j] = this.matrix[i][j] * this.matrix[i][j];
      }
    }
    this.xx = Array(this.m).fill(0);
    this.xs = Array(this.m).fill(0);
    this.xs2 = Array(this.m).fill(0); 
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.xs[i] = this.matrix[j][i];
        this.xs2[i] = this.matrix2[j][i];
      }
      this.xx[i] = this.xs[i] / this.n;
    }  

    let temp1 = 0;
    for (let i = 0; i < this.m; i++) {
      temp1+=this.xs[i]*this.xs[i]
    }
    temp1 = temp1 / this.m;
    let temp2 = 0;
    for (let i = 0; i < this.m; i++) {
      temp2+=this.xs[i];
    }
    temp2 = (temp2*temp2)/(this.m * this.n);
    this.ss1 = temp1 - temp2;

    temp1 = 0;
    for (let i = 0; i < this.m; i++) {
      temp1+=this.xs2[i];
    }
    temp2 = 0;
    for (let i = 0; i < this.n; i++) {
      let r = 0;
      for (let j = 0; j < this.m; j++) {
        r += this.matrix[i][j];
      }
      temp2+=r*r;
    }
    temp2 = temp2 / this.n;
    console.log(temp2);
    this.ss2 = temp1 - temp2;

    this.df = this.ss1/(this.m-1);
    this.k1 = this.m-1;
    this.ds = this.ss2/(this.m*(this.n-1));
    this.k2 = this.m*(this.n-1);

    this.f = this.df / this.ds;
  }
}
