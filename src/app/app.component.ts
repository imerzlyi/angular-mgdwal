import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  n: number = 5;
  m: number = 8;
  nRange: number[] = [0,1,2,3,4];
  mRange: number[] = [0,1,2,3,4,5,6,7];
  matrix: number[][] = [[2,1,0,0,0,0,0,0],
                        [3,4,3,0,0,0,0,0],
                        [0,0,5,10,8,0,0,0],
                        [0,0,0,1,0,6,1,1],
                        [0,0,0,0,0,0,4,1]];
  x: number[] = [5,10,15,20,25,30,35,40];
  y: number[] = [100,120,140,160,180];

  yx: number[] = [];
  xy: number[] = [];
  yy: number;
  xx: number;
  yy2: number;
  xx2: number;

  nx: number[] = [];
  ny: number[] = [];
  nx_sum: number;
  ny_sum: number;

  s2x: number;
  s2y: number;
  sx: number;
  sy: number;

  sm: number;

  rxy: number;

  a1: number;
  b1: number;
  c1: number;

  a2: number;
  b2: number;
  c2: number;

  valA: number;
  valB: number;

  onClick(): void {
    this.gen();
  }

  ngOnInit(): void {
    this.gen();
  }

  gen(): void {
    this.nRange = Array(this.n).fill(0).map((x,i)=>i);
    this.mRange = Array(this.m).fill(0).map((x,i)=>i);
    //this.matrix = Array(this.n).fill(Array(this.m).fill(0));
    this.matrix = []
    for (let i = 0; i < this.n; i++) {
      this.matrix.push(Array(this.m).fill(0));
    }
    this.x = Array(this.m).fill(0);
    this.y = Array(this.n).fill(0);
  }

  solve(): void {
    this.yx = Array(this.m).fill(0);
    this.xy = Array(this.n).fill(0);
    this.nx = Array(this.m).fill(0);
    this.ny = Array(this.n).fill(0);
    this.nx_sum = 0;
    for (let i = 0; i < this.m; i++) {
      let res = 0;
      for (let j = 0; j < this.n; j++) {
        res+=this.matrix[j][i]*this.y[j];
        this.nx[i]+=this.matrix[j][i];
      }
      this.yx[i] = res / this.nx[i];
      this.nx_sum += this.nx[i];
    }
    this.ny_sum = 0;
    for (let i = 0; i < this.n; i++) {
      let res = 0;
      for (let j = 0; j < this.m; j++) {
        res+=this.matrix[i][j]*this.x[j];
        this.ny[i]+=this.matrix[i][j];
      }
      this.xy[i] = res / this.ny[i];
      this.ny_sum += this.ny[i];
    }

    let temp = 0;
    let temp2 = 0;
    for (let i = 0; i < this.m; i++) {
      temp += this.yx[i]*this.nx[i]
      temp2 += this.x[i]*this.x[i]*this.nx[i];
    }
    this.yy = temp / this.nx_sum;
    this.xx2 = temp2 / this.nx_sum;
    temp = 0;
    temp2 = 0;
    for (let i = 0; i < this.n; i++) {
      temp += this.xy[i]*this.ny[i];
      temp2 += this.y[i]*this.y[i]*this.ny[i];
    }
    this.xx = temp / this.ny_sum;
    this.yy2 = temp2 / this.ny_sum;

    this.s2x = this.xx2 - this.xx*this.xx;
    this.s2y = this.yy2 - this.yy*this.yy;

    this.sx = Math.sqrt(this.s2x);
    this.sy = Math.sqrt(this.s2y);

    this.sm = 0;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        this.sm+=this.matrix[i][j]*this.x[j]*this.y[i];
      }
    }

    this.rxy = (this.sm - this.nx_sum*this.xx*this.yy) / (this.nx_sum * this.sy * this.sx);

    this.a1 = 0;
    this.b1 = 0;
    this.c1 = 0;

    this.a2 = 0;
    this.b2 = this.nx_sum;
    this.c2 = 0;
    for (let i = 0; i< this.m; i++) {
      this.a1 += this.x[i]*this.x[i];
      this.b1 += this.x[i];
      this.c1 += this.x[i]*this.yx[i];

      this.a2 += this.x[i];
      this.c2 += this.yx[i];
    }

    this.valB = (this.c2*this.a1-this.a2*this.c1)/(this.a1*this.b2-this.a2*this.b1);
    this.valA = (this.c1 - this.b1*this.valB)/this.a1;
  }
}