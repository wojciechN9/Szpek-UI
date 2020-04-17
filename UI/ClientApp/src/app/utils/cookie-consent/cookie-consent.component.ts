import { Component, Inject } from "@angular/core";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent {
  public isConsented: boolean = false;
  private readonly COOKIE_CONSENT = "cookie_consent";
  private readonly COOKIE_CONSENT_EXPIRE_DAYS = 365;

  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale) {
    this.isConsented = this.getCookie(this.COOKIE_CONSENT) === '1';
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  public consent() {
    this.setCookie(this.COOKIE_CONSENT, '1', this.COOKIE_CONSENT_EXPIRE_DAYS);
    this.isConsented = true;
  }
}
