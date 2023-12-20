let projects = []
fetch('../projects.json')
        .then((response) => response.json())
        .then((json) => getData(json))




function getData(projects){
    const table = document.getElementById("table_body");
    let i = 0;
    for (let project of projects){
        i++;
        let tr = document.createElement("tr")
        
        tr.innerHTML = `
                <td width="5%">${i}</td>
                <td width="50%">${project.name}</td>
                <td width="40%"><a href="${project.link}">${(project.type=="APP")?"Tải":"Đường dẫn"}</a></td>
                <td width="5%">${project.type}</td>
        `
        table.appendChild(tr)
    }

    document.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', e => {
          const href = e.target.href;
          e.preventDefault();
          isURLValid(href)
        });
      });
}

function isURLValid(href){
    console.log(href);
    fetch(href)
  .then(response => {
    if (!response.ok) {
        
        window.location.href = "./error/error404.html"
    }
    else 
    window.location.href = href
    // Hoặc xử lý phản hồi theo định dạng khác
  })
}

