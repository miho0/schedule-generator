import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Configuration} from "../models/Configuration";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formData: Configuration = {
    name: "",
    program: "",
    year: "",
    group: "",
    RVgroups: ["", "", "", ""] // TODO this should be done dynamically
  }

  nameControl = new FormControl(null, Validators.required);

  programsControl = new FormControl(null, Validators.required);
  programs = ["RIT", "ITK"]

  yearsControl = new FormControl(null, Validators.required);
  years = ["1", "2", "3"]

  groupControl = new FormControl(null, Validators.required);
  groups = ["RIT", "ITK"]

  RVSubjects = [
    {
      name: "PLATFORMNO ODVISEN RAZVOJ APLIKACIJ",
      groups: ["RV1", "RV2", "RV3"],
      formControl: new FormControl(null, Validators.required)
    },
    {
      name: "UVOD V RAČUNALNIŠKI VID IN RAZPOZNAVANJE VZORCEV",
      groups: ["RV1", "RV2", "RV3"],
      formControl: new FormControl(null, Validators.required)
    },
    {
      name: "RAZVOJ RAČUNALNIŠKIH IGER",
      groups: ["RV1", "RV2", "RV3"],
      formControl: new FormControl(null, Validators.required)
    },
    {
      name: "PARALELNO IN PORAZDELJENO RAČUNANJE",
      groups: ["RV1", "RV2", "RV3"],
      formControl: new FormControl(null, Validators.required)
    }
  ]

  test() {
    console.log(this.formData)
  }
}
