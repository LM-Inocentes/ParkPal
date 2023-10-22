
function popUpFunc(){
    //document.getElementById('sample').innerHTML = "This is clicked";
    //document.write("Testing 123");
    //window.alert("I hope it works!!! but not changing txt");
    const openModalBtns = document.querySelectorAll('[data-modal-target]')
    const closeModalBtns = document.querySelectorAll('[data-close-btn]')
    const overlay = document.getElementById('overlay')

    openModalBtns.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })

    closeModalBtns.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })

    function openModal(modal){
        if(modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal(modal){
        if(modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

}

// let accptBtn = document.getElementById("accptBtn")
// let rejctBtn = document.getElementById("rejctBtn")
// const openModalBtns = document.querySelectorAll('[data-modal-target]')
// const closeModalBtns = document.querySelectorAll('[data-close-btn]')
// const overlay = document.getElementById('overlay')

// openModalBtns.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = document.querySelector(button.dataset.modalTarget)
//         openModal(modal)
//     })
// })

// closeModalBtns.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = button.closest('.modal')
//         closeModal(modal)
//     })
// })

// function openModal(modal){
//     if(modal == null) return
//     modal.classList.add('active')
//     overlay.classList.add('active')
// }

// function closeModal(modal){
//     if(modal == null) return
//     modal.classList.remove('active')
//     overlay.classList.remove('active')
// }