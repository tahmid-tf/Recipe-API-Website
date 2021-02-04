let search = document.querySelector("#search");
let submit = document.querySelector("#submit");
let row = document.querySelector("#row");
let infoShow = document.querySelector("#info");
let briefInfo = document.querySelector("#briefInfo");
let imgIconInPage = document.querySelector("#imgIcon");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  row.innerHTML = "";
  briefInfo.innerHTML = "";
  infoShow.innerHTML = "";
  fetch(`https://forkify-api.herokuapp.com/api/search?q=${search.value}`)
    .then((res) => {
      if (res.ok === false) {
        briefInfo.innerHTML = `Search result found nothing related to '${search.value}'`;
        console.log(false);
        return;
      } else {
        return res.json();
      }
    })
    .then((data) => {
      imgIconInPage.classList.add("hidden");

      let totalResultArray = [];
      infoShow.innerHTML = search.value;
      for (let value in data) {
        for (let val in data[value]) {
          //   console.log(data[value][val]);
          let values = data[value][val];
          totalResultArray.push(data[value][val]);
          let html = `<div class="col-md-3 col-sm-6 portfolio-item">
                        <a class="portfolio-link" style="text-align: center" href="${
                          values.source_url
                        }" target="blank">
                            <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fas fa-plus fa-3x"></i>
                            </div>
                            </div>
                            <img
                            class="img-fluid"
                            src="${values.image_url}"
                            style="margin : display: block; margin: auto"
                            alt=""
                            />
                        </a>
                        <div class="portfolio-caption">
                            <h5>${values.title}</h5><br>
                            <p>${values.publisher}</p>
                            <p class="text-muted">Social rank - ${Math.trunc(
                              values.social_rank
                            )}%</p>
                        </div>
                        </div>`;
          briefInfo.innerHTML = `Showing all results related to '${search.value}'<br>(${totalResultArray.length} results found)`;
          row.insertAdjacentHTML("afterbegin", html);
        }
      }
    });
});
