import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

export default class StickyHeader {
    constructor () {
        this.siteHeader = document.querySelector(".site-header");

        this.pageSections = document.querySelectorAll('.page-section');

        this.browserHeight = window.innerHeight;
        this.prevScrollPosition = window.scrollY;

        this.events();
    }

    events () {
        window.addEventListener('scroll', throttle( () => this.runOnscroll(), 200));
        window.addEventListener('resize', debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 200));
    }

    runOnscroll() {
        this.defineScrollDirection();

        if(window.scrollY > 60) {
            this.siteHeader.classList.add('site-header--is-sticky');
        }else {
            this.siteHeader.classList.remove('site-header--is-sticky');
        }

        this.pageSections.forEach( section => {
            this.calculateSection(section);
        });
    }

    defineScrollDirection() {
        if(this.prevScrollPosition < window.scrollY) {
            this.scrollDirection = "down";
        }else {
            this.scrollDirection = "up";
        }

        this.prevScrollPosition = window.scrollY;
    }

    calculateSection(section) {
        
        if(window.scrollY + this.browserHeight > section.offsetTop && window.scrollY < section.offsetHeight + section.offsetTop) {
            let scrollPersentage = section.getBoundingClientRect().top / this.browserHeight * 100;

            if(scrollPersentage < 18 && scrollPersentage > -0.1 && this.scrollDirection == "down" || scrollPersentage < 33 && this.scrollDirection == "up") {
                let matchingLinks = section.getAttribute('data-matching-link');

                document.querySelectorAll(`.primary-nav a:not(${matchingLinks})`).forEach( link => link.classList.remove("is-current-link"));

                document.querySelector(matchingLinks).classList.add("is-current-link");
            }
        }
    }
}