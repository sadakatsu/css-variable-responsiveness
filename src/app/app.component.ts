import {AfterViewInit, Component, HostListener, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";

interface Measurements {
  borderBottom: number;
  borderLeft: number;
  borderRight: number;
  borderTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public constructor(@Inject(DOCUMENT) private document: Document) {}

  public ngAfterViewInit(): void {
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    const [toQuery, toQueryStyle] = this.getStyle('to-query');

    /*
    const availableHeight = (
      leftColumn.clientHeight -
      leftColumnStyle.paddingTop -
      leftColumnStyle.paddingBottom -
      4 * (
        toPlayStyle.marginTop +
        toPlay.clientHeight +
        toPlayStyle.marginBottom
      ) -
      boardStyle.marginTop -
      boardStyle.borderTop -
      boardStyle.borderBottom -
      boardStyle.marginBottom
    );
    const availableWidth = (
      leftColumn.clientWidth -
      leftColumnStyle.paddingLeft -
      leftColumnStyle.paddingRight
    );
     */
    const availableHeight = (
      toQuery.clientHeight -
      toQueryStyle.marginBottom -
      toQueryStyle.marginTop -
      toQueryStyle.paddingBottom -
      toQueryStyle.paddingTop
    );
    const availableWidth = (
      toQuery.clientWidth -
      toQueryStyle.marginLeft -
      toQueryStyle.marginRight -
      toQueryStyle.paddingLeft -
      toQueryStyle.paddingRight
    );

    const value = Math.min(availableHeight / 2, availableWidth / 2);

    const documentElement = document.documentElement;
    documentElement.style.setProperty('--main-height', `${value}px`);
    documentElement.style.setProperty('--main-width', `${value}px`);

    console.log(
      documentElement.style.getPropertyValue('--main-width'),
      documentElement.style.getPropertyValue('--main-height')
    );
  }

  private getStyle(id: string): [HTMLElement, Measurements] {
    const element = this.document.querySelector(`#${id}`) as HTMLElement;
    const style = (element as any).currentStyle || window.getComputedStyle(element);
    const converted: Measurements = {
      borderBottom: parseFloat(style.borderBottom),
      borderLeft: parseFloat(style.borderLeft),
      borderRight: parseFloat(style.borderRight),
      borderTop: parseFloat(style.borderTop),
      marginBottom: parseFloat(style.marginBottom),
      marginLeft: parseFloat(style.marginLeft),
      marginRight: parseFloat(style.marginRight),
      marginTop: parseFloat(style.marginTop),
      paddingBottom: parseFloat(style.paddingBottom),
      paddingLeft: parseFloat(style.paddingLeft),
      paddingRight: parseFloat(style.paddingRight),
      paddingTop: parseFloat(style.paddingTop),
    };
    console.log(id, element.clientWidth, element.clientHeight, converted);
    return [element, converted];
  }
}
