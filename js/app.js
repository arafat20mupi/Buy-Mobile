const loadPhone = async (searchText ="g" , isShow) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones ,isShow);
};

const displayPhones = (phones , isShow) => {
   const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    const seeAllPhone = document.getElementById('see-all-phone');
    if (phones.length > 9 && !isShow){
        seeAllPhone.classList.remove('hidden');
    }
    else{
        seeAllPhone.classList.add('hidden');
    }

    if (!isShow){
        phones = phones.slice(0,9);
    }
    // console.log("is show", isShow);
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = ` card bg-gray-100 shadow `;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="showAllDetails('${phone.slug}')" class="btn btn-primary ">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });
    toggleLoadingSpanners(false);

}
const handleSearch = (isShow) => {
    toggleLoadingSpanners(true);
    const searchText = document.getElementById('search-filed').value;
    const seeAllPhone = document.getElementById('see-all-phone-btn');
    if (searchText.length > 0 &&!isShow){
        seeAllPhone.classList.remove('hidden');
    }
    loadPhone(searchText , isShow);
};

toggleLoadingSpanners = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
};

const showAllDetails =async (id) => {
    // console.log('showAllDetails', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    
    showPhoneDetail(data.data);
}
const showPhoneDetail =(phone) => {
    console.log(phone);
    const showDetailsPhoneName = document.getElementById('showDetailsPhoneName');
    showDetailsPhoneName.innerText = phone.name;
    const showDetailsImg = document.getElementById('showDetailsImg');
    showDetailsImg.src = phone.image;
    const DetailsPhoneShow = document.getElementById('DetailsPhoneShow');
    DetailsPhoneShow.innerText = phone.mainFeatures.memory;
    const showDetailDisplaySize = document.getElementById('showDetailDisplaySize');
    showDetailDisplaySize.innerText = phone.mainFeatures.displaySize;
    const showDetailReleaseDate = document.getElementById('showDetailReleaseDate');
    showDetailReleaseDate.innerText = phone.releaseDate;
    const showDetailChipset = document.getElementById('showDetailChipset');
    showDetailChipset.innerText = phone?.mainFeatures?.chipSet;
    const showDetailBrand = document.getElementById('showDetailBrand');
    showDetailBrand.innerText = phone.brand;
    // const showDetailPrice = document.getElementById('showDetailPrice');
    // showDetailPrice.innerText = phone.price;
    const showDetailGPS = document.getElementById('showDetailGPS');
    showDetailGPS.innerText = phone.others.GPS;


    showDetailsModal.showModal();
};


const seeAllPhone = document.getElementById('see-all-phone');
seeAllPhone.addEventListener('click', () => {
    handleSearch(true);
});
loadPhone();
