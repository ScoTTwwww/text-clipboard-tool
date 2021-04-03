import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [
    {
      title: 'Logout',
    },
  ];

  textList: Array<string>;

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService
  ) {

  }


  ngOnInit(): void {

    this.http.get('assets/text.txt', { responseType: 'text' })
      .subscribe(data => {

        this.textList = data.split('=====================item=======================');
         console.log(data.split('=====================item======================='))
      });
  }


  clickText() {
    this.showToast('bottom-end', 'success', `更新成功 !`);
  }

  showToast(position, status, content) {
    this.toastrService.show(
      status || 'Success',
      content,
      { position, status });
  }
}
