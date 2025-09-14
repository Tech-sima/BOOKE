// Флаг для отслеживания инициализации iconReplace
let iconReplaceInitialized = false;

document.addEventListener('DOMContentLoaded',()=>{
    // Предотвращаем повторную инициализацию
    if (iconReplaceInitialized) {
        console.log('⚠️ Icon replace already initialized, skipping...');
        return;
    }
  const icons=document.querySelectorAll('i[class*="fa-"]:not([data-no-replace])');
  icons.forEach(el=>{
    const cls=Array.from(el.classList).find(c=>c.startsWith('fa-')&&!c.startsWith('fa-solid'))||Array.from(el.classList).find(c=>c.startsWith('fa-')&&c!=='fa-solid');
    if(!cls) return;
    const name=cls.replace('fa-','');
    const img=document.createElement('img');
    img.src=`assets/icons/${name}.svg`;
    img.alt=name;
    img.className='icon';
    el.replaceWith(img);
      });
    
    iconReplaceInitialized = true;
    console.log('✅ Icon replace initialized');
}); 