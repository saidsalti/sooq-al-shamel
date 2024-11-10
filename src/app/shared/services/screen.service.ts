import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private mobileMaxWidth = 767;
  private tabletMaxWidth = 1024;
  private desktopMaxWidth = 1440;

  constructor() {}

  getScreenSize(): 'mobile' | 'tablet' | 'desktop' | 'large' {
    const width = window.innerWidth;

    if (width <= this.mobileMaxWidth) {
      return 'mobile';
    } else if (width > this.mobileMaxWidth && width <= this.tabletMaxWidth) {
      return 'tablet';
    } else if (width > this.tabletMaxWidth && width <= this.desktopMaxWidth) {
      return 'desktop';
    } else {
      return 'large';
    }
  }

  isMobile(): boolean {
    return this.getScreenSize() === 'mobile';
  }

  isTablet(): boolean {
    return this.getScreenSize() === 'tablet';
  }

  isDesktop(): boolean {
    return this.getScreenSize() === 'desktop';
  }

  isLargeScreen(): boolean {
    return this.getScreenSize() === 'large';
  }
}
