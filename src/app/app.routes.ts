import { Routes } from "@angular/router";
import { EmpresaFindallComponent } from "./components/empresa/empresa-findall/empresa-findall.component";
import { FuncionarioFindallComponent } from "./components/funcionario/funcionario-findall/funcionario-findall.component";
import { Funcionario2 } from "./components/funcionario/funcionario2/funcionario2";
import { About } from "./components/layout/about/about";
import { Home } from "./components/layout/home/home";
import { NavigationComponent } from "./components/layout/navigation/navigation.component";
import { ProdesFindallComponent } from "./components/prodes/prodes-findall/prodes-findall.component";
import { AddressFormComponent } from "./components/schematic/address-form/address-form.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'navigation',
  },
  {
    path: 'navigation',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'empresa',
        component: EmpresaFindallComponent,
      },
      {
        path: 'funcionario',
        component: FuncionarioFindallComponent,
      },
      {
        path: 'funcionario2',
        component: Funcionario2,
      },
      {
        path: 'prodes',
        component: ProdesFindallComponent,
      },
      {
        path: 'address-form',
        component: AddressFormComponent,
      },
    ],
  },
];
