(()=>{
      const modal=document.getElementById('productModal'),modalImage=modal.querySelector('img'),closeModal=()=>{modal.classList.remove('open');document.body.style.overflow=''};
      const openModal=(src,alt)=>{modalImage.src=src;modalImage.alt=alt||modalImage.alt;modal.classList.add('open');document.body.style.overflow='hidden';modal.querySelector('button').focus()};
      document.addEventListener('click',event=>{const target=event.target.closest('[data-lightbox]');if(target)openModal(target.dataset.lightbox,target.querySelector('img')?.alt)});
      modal.querySelector('button').addEventListener('click',closeModal);modal.addEventListener('click',event=>{if(event.target===modal)closeModal()});document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal()});
      const sprinklerGallery=document.querySelector('.pdp-gallery');
      if(sprinklerGallery){
        const thumbs=[...sprinklerGallery.querySelectorAll('.pdp-gallery__thumb')],image=document.getElementById('galleryMain'),title=document.getElementById('galleryCaption'),count=document.getElementById('galleryCount');let index=0,touchStart=0;
        const show=next=>{index=(next+thumbs.length)%thumbs.length;const selected=thumbs[index];image.src=selected.querySelector('img').getAttribute('src');image.alt=selected.dataset.galleryAlt;title.textContent=selected.dataset.galleryTitle;count.textContent=`${index+1} / ${thumbs.length}`;thumbs.forEach((thumb,i)=>thumb.classList.toggle('active',i===index))};
        thumbs.forEach(thumb=>thumb.addEventListener('click',()=>show(Number(thumb.dataset.index))));sprinklerGallery.querySelector('.pdp-gallery__arrow--prev').addEventListener('click',()=>show(index-1));sprinklerGallery.querySelector('.pdp-gallery__arrow--next').addEventListener('click',()=>show(index+1));
        image.addEventListener('click',()=>openModal(image.src,image.alt));
        image.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX},{passive:true});image.addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>45)show(index+(delta<0?1:-1)*(document.dir==='rtl'?-1:1))},{passive:true});
        return;
      }
      const gallery=document.querySelector('[data-gallery]');
      if(!gallery)return; // Single-photo pages keep zoom without introducing a carousel.
      gallery.querySelector('[data-gallery-count]').dir='ltr';
      const thumbs=[...gallery.querySelectorAll('[data-gallery-index]')],main=gallery.querySelector('.wav-gallery__main'),image=main.querySelector('img'),title=gallery.querySelector('[data-gallery-title]'),count=gallery.querySelector('[data-gallery-count]');let index=0,touchStart=0;
      const show=next=>{index=(next+thumbs.length)%thumbs.length;const selected=thumbs[index];image.src=selected.dataset.src;image.alt=selected.dataset.alt;main.dataset.lightbox=selected.dataset.src;title.textContent=selected.dataset.title;count.textContent=`${index+1} / ${thumbs.length}`;thumbs.forEach((thumb,i)=>thumb.classList.toggle('active',i===index))};
      thumbs.forEach(thumb=>thumb.addEventListener('click',()=>show(Number(thumb.dataset.galleryIndex))));gallery.querySelector('.wav-gallery__arrow--prev').addEventListener('click',()=>show(index-1));gallery.querySelector('.wav-gallery__arrow--next').addEventListener('click',()=>show(index+1));
      gallery.querySelector('.wav-gallery__stage').addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX},{passive:true});gallery.querySelector('.wav-gallery__stage').addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>45)show(index+(delta<0?1:-1)*(document.dir==='rtl'?-1:1))},{passive:true});
    })();
