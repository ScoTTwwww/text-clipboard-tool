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

  currentIndex: number = 0;
  textList: Array<{ title: string, content: any }>;

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService
  ) {

  }


  ngOnInit(): void {

    this.http.get('assets/text.txt', { responseType: 'text' })
      .subscribe(data => {
        const list = data.split('=====================item=======================');
        const dataList = [];
        list.forEach((item: any) => {

          if (item.split('--------').length > 2) {
            const title = item.split('--------')[1];
            const content = item.split('--------')[2];
            const lineLength = content.split("\n").length;

            dataList.push({
              title: title,
              content: content,
              lineLength: lineLength
            })
          } else {
            dataList.push({
              title: '',
              content: item,
              lineLength: item.split("\n").length
            })
          }
        })

        this.textList = dataList;
        console.log(dataList)
      });
  }


  clickText(text, index) {
    this.currentIndex = index;
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (text));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');

    this.showToast('bottom-end', 'success', `更新成功 !`);
  }

  showToast(position, status, content) {
    this.toastrService.show(
      status || 'Success',
      content,
      { position, status });
  }
}
