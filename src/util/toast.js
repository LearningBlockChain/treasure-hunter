import Vue from 'vue';
import fontawesome from '@fortawesome/fontawesome'
import faSolid from '@fortawesome/fontawesome-free-solid'

let toast = function(message, type) {
    let options = {
        theme: "outline",
        position: "bottom-right",
        duration : 5000,
        type: type
    };

    switch(type) {
        case 'success':
            return Vue.toasted.show(`${fontawesome.icon(faSolid.faThumbsUp).html} ${message}`, options)
        case 'error':
            return Vue.toasted.show(`${fontawesome.icon(faSolid.faThumbsDown).html} ${message}`, options);
        case 'info':
            return Vue.toasted.show(`${fontawesome.icon(faSolid.faEthereum).html} ${message}`, options);
        default:
            return Vue.toasted.show(`${fontawesome.icon(faSolid.faBullhorn).html} ${message}`, options);
    }
}

export default toast
