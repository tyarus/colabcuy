document.addEventListener('DOMContentLoaded', function() {
    const cards = [
        {
            id: 1,
            name: "Ace of Hearts",
            suit: "hearts",
            rank: "A",
            price: "Rp 149k",
            description: "Kartu As Hati premium dengan desain elegan terinspirasi dari Balatro. Sempurna untuk kolektor dan penggemar kartu.",
            special: "limited"
        },
        {
            id: 2,
            name: "King of Spades",
            suit: "spades",
            rank: "K",
            price: "Rp 135k",
            description: "Raja Sekop kerajaan dengan detail rumit dan kartu berkualitas premium. Salah satu produk terlaris kami."
        },
        {
            id: 3,
            name: "Queen of Diamonds",
            suit: "diamonds",
            rank: "Q",
            price: "Rp 135k",
            description: "Ratu Wajik elegan dengan desain unik terinspirasi oleh dunia Balatro. Dibuat dengan bahan premium."
        },
        {
            id: 4,
            name: "Jack of Clubs",
            suit: "clubs",
            rank: "J",
            price: "Rp 120k",
            description: "Kartu Jack Keriting bergaya dengan karya seni luar biasa dan tahan lama. Sempurna untuk bermain dan dipajang."
        },
        {
            id: 5,
            name: "10 of Hearts",
            suit: "hearts",
            rank: "10",
            price: "Rp 105k",
            description: "10 Hati berkualitas tinggi dengan finishing halus dan warna cerah. Dibuat untuk bertahan dalam permainan tanpa batas."
        },
        {
            id: 6,
            name: "Ace of Spades",
            suit: "spades",
            rank: "A",
            price: "Rp 149k",
            description: "As Sekop klasik dengan gaya khas terinspirasi Balatro. Wajib dimiliki untuk koleksi kartu manapun.",
            special: "rare"
        },
        {
            id: 7,
            name: "Queen of Hearts",
            suit: "hearts",
            rank: "Q",
            price: "Rp 135k",
            description: "Ratu Hati yang indah dengan detail menakjubkan dan sentuhan artistik. Salah satu kartu kami yang paling banyak dicari."
        },
        {
            id: 8,
            name: "King of Diamonds",
            suit: "diamonds",
            rank: "K",
            price: "Rp 135k",
            description: "Raja Wajik mewah dengan elemen desain premium dan kualitas kartu superior untuk kolektor serius."
        },
        {
            id: 9,
            name: "Jack of Spades",
            suit: "spades",
            rank: "J",
            price: "Rp 120k",
            description: "Jack Sekop premium dengan detail artistik unik terinspirasi oleh gaya visual Balatro."
        },
        {
            id: 10,
            name: "9 of Clubs",
            suit: "clubs",
            rank: "9",
            price: "Rp 105k",
            description: "9 Keriting berkualitas tinggi dengan tekstur halus dan berat sempurna. Ideal untuk pemain dan kolektor."
        },
        {
            id: 11,
            name: "7 of Diamonds",
            suit: "diamonds",
            rank: "7",
            price: "Rp 105k",
            description: "Kartu 7 Wajik yang indah dengan warna cerah dan finishing halus. Dibuat dengan kertas kartu premium."
        },
        {
            id: 12,
            name: "Joker",
            suit: "special",
            rank: "★",
            price: "Rp 195k",
            description: "Kartu Joker edisi terbatas dengan elemen desain unik. Barang koleksi langka dan pusat perhatian yang sempurna.",
            special: "limited"
        }
    ];

    // Mendapatkan elemen DOM
    const cardGallery = document.querySelector('.card-gallery');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <h3>Tidak Ada Kartu Ditemukan</h3>
        <p>Maaf, tidak ada kartu yang cocok dengan filter saat ini. Silakan coba kategori lain.</p>
        <button class="btn reset-filter">Tampilkan Semua Kartu</button>
    `;
    cardGallery.after(emptyState);

    // Render awal
    renderCards('all');

    // Menambahkan event listener ke tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            renderCards(filter);
        });
    });

    // Event listener tombol reset filter
    document.querySelector('.reset-filter').addEventListener('click', function() {
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.add('active');
            }
        });
        renderCards('all');
    });

    // Fungsi untuk merender kartu
    function renderCards(filter) {
        // Membersihkan galeri kartu
        cardGallery.innerHTML = '';
        
        // Filter kartu
        const filteredCards = filter === 'all' 
            ? cards 
            : cards.filter(card => card.suit === filter);
        
        // Menampilkan keadaan kosong jika tidak ada kartu yang cocok dengan filter
        if (filteredCards.length === 0) {
            emptyState.style.display = 'block';
            return;
        } else {
            emptyState.style.display = 'none';
        }
        
        // Render kartu
        filteredCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card-item';
            cardElement.setAttribute('data-id', card.id);
            
            const cardColorClass = (card.suit === 'hearts' || card.suit === 'diamonds') ? 'red' : 'black';
            const suitSymbol = getSuitSymbol(card.suit);
            
            // Membuat struktur HTML untuk kartu
            cardElement.innerHTML = `
                ${card.special ? `<div class="card-badge ${card.special}">${card.special === 'limited' ? 'Edisi Terbatas' : 'Langka'}</div>` : ''}
                <div class="card-image">
                    <div class="card-rank">${card.rank}</div>
                    <div class="card-suit ${cardColorClass}">${suitSymbol}</div>
                    <div class="card-rank" style="transform: rotate(180deg);">${card.rank}</div>
                </div>
                <div class="card-details">
                    <h3 class="card-name">${card.name}</h3>
                    <p class="card-description">${card.description}</p>
                    <div class="card-price">
                        <span>${card.price}</span>
                        <button class="add-to-cart" data-id="${card.id}">Tambahkan ke Keranjang</button>
                    </div>
                </div>
            `;
            
            // Menambahkan kartu ke galeri
            cardGallery.appendChild(cardElement);
        });
        
        // Menambahkan event listener ke tombol 'Tambahkan ke Keranjang'
        addCartButtonEventListeners();
    }
    
    // Fungsi untuk menambahkan event listener ke tombol 'Tambahkan ke Keranjang'
    function addCartButtonEventListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Mencegah event klik kartu
                
                const cardId = this.getAttribute('data-id');
                const card = cards.find(card => card.id == cardId);
                
                // Mensimulasikan penambahan ke keranjang dengan animasi
                this.textContent = 'Ditambahkan!';
                this.disabled = true;
                this.style.backgroundColor = '#50fa7b';
                
                // Menampilkan notifikasi (Anda dapat menyesuaikannya)
                showNotification(`${card.name} ditambahkan ke keranjang!`);
                
                // Mengatur ulang tombol setelah 2 detik
                setTimeout(() => {
                    this.textContent = 'Tambahkan ke Keranjang';
                    this.disabled = false;
                    this.style.backgroundColor = '';
                }, 2000);
            });
        });
        
        // Membuat seluruh kartu dapat diklik untuk melihat detail
        const cardItems = document.querySelectorAll('.card-item');
        cardItems.forEach(card => {
            card.addEventListener('click', function() {
                const cardId = this.getAttribute('data-id');
                const cardData = cards.find(card => card.id == cardId);
                
                // Menampilkan modal detail kartu (Anda dapat mengimplementasikan ini)
                showCardDetails(cardData);
            });
        });
    }
    
    // Fungsi pembantu untuk mendapatkan simbol jenis
    function getSuitSymbol(suit) {
        switch(suit) {
            case 'hearts': return '♥';
            case 'spades': return '♠';
            case 'diamonds': return '♦';
            case 'clubs': return '♣';
            case 'special': return '★';
            default: return '';
        }
    }
    
    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        // Membuat elemen notifikasi
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Menambahkan gaya
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'rgba(40, 42, 54, 0.9)';
        notification.style.color = '#f8f8f2';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.borderLeft = '4px solid #ff5555';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        notification.style.zIndex = '1000';
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        notification.style.transition = 'transform 0.3s, opacity 0.3s';
        
        // Menambahkan ke DOM
        document.body.appendChild(notification);
        
        // Memicu animasi
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Menghapus setelah 3 detik
        setTimeout(() => {
            notification.style.transform = 'translateY(20px)';
            notification.style.opacity = '0';
            
            // Menghapus dari DOM setelah animasi selesai
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Fungsi untuk menampilkan detail kartu (modal)
    function showCardDetails(card) {
        // Membuat kontainer modal
        const modal = document.createElement('div');
        modal.className = 'card-modal';
        
        // Menambahkan gaya
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s';
        
        // Membuat konten modal
        const cardColorClass = (card.suit === 'hearts' || card.suit === 'diamonds') ? 'red' : 'black';
        const suitSymbol = getSuitSymbol(card.suit);
        
        modal.innerHTML = `
            <div class="modal-content" style="
                background-color: #1e1e2e;
                border-radius: 15px;
                border: 2px solid #ff5555;
                max-width: 600px;
                width: 90%;
                padding: 30px;
                position: relative;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            ">
                <button class="close-modal" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: #ff5555;
                    font-size: 24px;
                    cursor: pointer;
                ">×</button>
                
                <div style="display: flex; flex-wrap: wrap; gap: 30px;">
                    <div style="
                        flex: 1;
                        min-width: 200px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    ">
                        <div style="
                            width: 200px;
                            height: 300px;
                            background-color: #2c2c44;
                            border-radius: 15px;
                            border: 2px solid #ff5555;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding: 20px;
                        ">
                            <div style="font-size: 24px; font-weight: bold;">${card.rank}</div>
                            <div style="font-size: 80px; text-align: center; color: ${cardColorClass === 'red' ? '#ff5555' : '#f8f8f2'};">${suitSymbol}</div>
                            <div style="font-size: 24px; font-weight: bold; transform: rotate(180deg);">${card.rank}</div>
                        </div>
                    </div>
                    
                    <div style="flex: 1; min-width: 200px;">
                        <h2 style="color: #f8f8f2; font-size: 28px; margin-bottom: 15px;">${card.name}</h2>
                        ${card.special ? `<div style="
                            display: inline-block;
                            background: ${card.special === 'limited' ? 'linear-gradient(to right, #ffb86c, #ff9d5c)' : 'linear-gradient(to right, #50fa7b, #5eff9d)'};
                            color: #000;
                            padding: 5px 10px;
                            border-radius: 20px;
                            font-size: 14px;
                            font-weight: bold;
                            margin-bottom: 15px;
                        ">${card.special === 'limited' ? 'Edisi Terbatas' : 'Langka'}</div>` : ''}
                        
                        <p style="color: #bd93f9; margin-bottom: 20px; line-height: 1.6;">${card.description}</p>
                        
                        <div style="
                            background-color: rgba(40, 42, 54, 0.6);
                            border-radius: 10px;
                            padding: 15px;
                            margin-bottom: 20px;
                        ">
                            <h3 style="color: #ff5555; margin-bottom: 10px;">Detail Kartu</h3>
                            <p style="color: #f8f8f2; margin-bottom: 5px;"><strong>Jenis:</strong> ${getSuitName(card.suit)}</p>
                            <p style="color: #f8f8f2; margin-bottom: 5px;"><strong>Peringkat:</strong> ${card.rank}</p>
                            <p style="color: #f8f8f2;"><strong>Bahan:</strong> Kertas kartu premium dengan finishing linen</p>
                        </div>
                        
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <div style="font-size: 28px; font-weight: bold; color: #ff5555;">${card.price}</div>
                            <button class="modal-add-to-cart" style="
                                background: linear-gradient(to right, #ff5555, #ff8080);
                                color: white;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 30px;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">Tambahkan ke Keranjang</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Menambahkan ke DOM
        document.body.appendChild(modal);
        
        // Mencegah halaman bergulir
        document.body.style.overflow = 'hidden';
        
        // Memicu animasi
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Event tutup modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
        
        // Tutup saat mengklik latar belakang
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Event tombol tambah ke keranjang
        const addToCartBtn = modal.querySelector('.modal-add-to-cart');
        addToCartBtn.addEventListener('click', function() {
            this.textContent = 'Ditambahkan!';
            this.disabled = true;
            this.style.backgroundColor = '#50fa7b';
            
            // Menampilkan notifikasi
            showNotification(`${card.name} ditambahkan ke keranjang!`);
            
            // Memperbarui tombol halaman utama juga
            const mainPageBtn = document.querySelector(`.add-to-cart[data-id="${card.id}"]`);
            if (mainPageBtn) {
                mainPageBtn.textContent = 'Ditambahkan!';
                mainPageBtn.disabled = true;
                mainPageBtn.style.backgroundColor = '#50fa7b';
                
                // Mengatur ulang tombol halaman utama setelah 2 detik
                setTimeout(() => {
                    mainPageBtn.textContent = 'Tambahkan ke Keranjang';
                    mainPageBtn.disabled = false;
                    mainPageBtn.style.backgroundColor = '';
                }, 2000);
            }
            
            // Tutup modal setelah 1 detik
            setTimeout(closeModal, 1000);
        });
        
        // Fungsi tutup modal
        function closeModal() {
            modal.style.opacity = '0';
            
            // Menghapus dari DOM setelah animasi selesai
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        }
        
        // Tutup dengan tombol escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    // Fungsi untuk mendapatkan nama jenis dalam bahasa Indonesia
    function getSuitName(suit) {
        switch(suit) {
            case 'hearts': return 'Hati';
            case 'spades': return 'Sekop';
            case 'diamonds': return 'Wajik';
            case 'clubs': return 'Keriting';
            case 'special': return 'Spesial';
            default: return '';
        }
    }
});