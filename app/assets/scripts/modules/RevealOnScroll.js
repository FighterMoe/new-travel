import throttle from 'lodash/throttle';

export default class RevealOnScroll {
    constructor (els, threadHoldPersent) {
        this.itemsToReveal = els;
        this.threadHoldPersent = threadHoldPersent;

        this.scrollThrottle = throttle(this.callCalu, 200).bind(this);
        
        this.events();
        this.initiallyHide();
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle);
    }

    callCalu() {
        this.itemsToReveal.forEach( item => {
            if(item.isReveal == false) {
                this.calculateIfScrolledTo(item);
                
            }
        });
    }

    calculateIfScrolledTo(item) {
        let scrollPersentage = (item.getBoundingClientRect().y / window.innerHeight) * 100;

        if (scrollPersentage < this.threadHoldPersent) {
            item.classList.add('reveal-item--is-visible');
            item.isReveal = true;
        }
    }

    initiallyHide() {
        this.itemsToReveal.forEach( item => {
            item.classList.add('reveal-item')
            item.isReveal = false;
        });
    }
}