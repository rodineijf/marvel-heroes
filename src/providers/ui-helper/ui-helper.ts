import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class UiHelperProvider {
  isLoading;
  loading;

  constructor(
    public toastController: ToastController,
    public http: HttpClient
  ) {}

  showLoading(): void {
    this.isLoading = true;
    this.loading = this.toastController.create({ message: "Loading..." });
    this.loading.present();
  }

  hideLoading(): void {
    if (this.isLoading) {
      this.loading.dismiss();
      this.isLoading = false;
    }
  }
}
