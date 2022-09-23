function includeHTML(tagname) {
    try {
        fetch(`/includes/${tagname}.html`).then(response => {
            return response.text()
        })
        .then(data => {
            if (data.includes('script')) {
                let scr = document.createElement('script');
                scr.textContent = data.substring(data.indexOf('<script>')).replace('<script>', '').replace('</script>', '');

                document.getElementsByTagName(tagname)[0].innerHTML = data.substring(0, data.indexOf('<script>'));
                document.body.appendChild(scr);
            } else {
                document.getElementsByTagName(tagname)[0].innerHTML = data;
            }
        });
    }catch{
        console.error(`CUSTOM ERROR : includeHTML.js(${tagname})`)
    }
}