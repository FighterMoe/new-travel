import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';


new MobileMenu;
new StickyHeader; 

new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonials'), 60);

let modal;

document.querySelectorAll('.open-modal').forEach( btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        if( typeof modal == 'undefined') {
            import(/*webpackChunkName: "modal"*/ './modules/Modal')
            .then( x => {
                modal = new x.default()
                setTimeout( () => modal.openModalMethod(), 20);
            } )
            .catch( () => console.log("error"));
        }else {
            modal.openModalMethod();
        }
    });
});

if(module.hot) { module.hot.accept(); }