export default class MobileMenu {
    constructor() {
        this.menuIcon = document.querySelector('.site-header__menu-icon');
        this.siteHeader = document.querySelector('.site-header');
        this.siteMenu = document.querySelector('.site-header__menu-container');

        this.events();
    }

    events() {
        this.menuIcon.addEventListener('click', () => this.toggleMenu());
    }

    toggleMenu() {
        this.siteMenu.classList.toggle('site-header__menu-container--is-visible');
        this.siteHeader.classList.toggle('site-header--is-expends');
        this.menuIcon.classList.toggle('site-header__menu-icon--x');
    }
}