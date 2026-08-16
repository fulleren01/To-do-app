// HTML içindeki gerekli elementleri ID'lerine göre seçiyoruz
const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const taskList = document.getElementById('taskList');

// Form gönderildiğinde (Ekle butonuna basıldığında) çalışacak olay
form.addEventListener('submit', function(e) {
    // Sayfanın yenilenmesini engelliyoruz (çok önemli!)
    e.preventDefault();

    // Input içine yazılan metni alıyoruz ve sağ/sol boşluklarını siliyoruz
    const text = input.value.trim();
    
    // Eğer input boşsa hiçbir şey yapma
    if (text === '') return;

    // Hafızada yeni bir <li> etiketi üretiyoruz
    const li = document.createElement('li');
    li.textContent = text;

    // Ürettiğimiz bu <li> etiketini ekrandaki <ul> listesinin içine ekliyoruz
    taskList.appendChild(li);

    // İşlem bittikten sonra inputu temizliyoruz ve odaklıyoruz
    input.value = '';
    input.focus();
});