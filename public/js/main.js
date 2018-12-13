// Global object
pages = { util:{}, page : {}}

pages.util.fadeElement = (id,ms) =>{
    setTimeout(()=>{
        let el = document.querySelector(`#${id}`);
        if(el)
            el.classList.toggle('hide');
    } ,ms)
}

pages.page.registration = ()=>{
    pages.util.fadeElement('message', 5000);
}

pages.page.login = ()=>{
    pages.util.fadeElement('message', 5000);
}

pages.page.blocks = () =>{
    pages.util.fadeElement('message', 5000);
}

document.addEventListener("DOMContentLoaded", function() {
    const url = window.location.href.match(/(?<=http([s])?\:\/\/(\S+)\/)(.*)?/g)[0];
    console.log(url);
    switch(url){
        case 'register':
            pages.page.registration();
            break;
        case 'login':
            pages.page.login();
            break;
        case '':
            console.log(3);
            break;
        case 'blocks':
            pages.page.blocks();
            break;
    }    
});

