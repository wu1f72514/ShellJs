class Html {
    /**
     * Parse les tags de variables et les remplace dans le body
     * ( les valeurs à substituer doit exister en tant que propriété de l'objet shell )
     * @param shellObj
     */
    parseTags(shellObj){

        // remplacement valeurs dans HTML
        let body = document.body.innerHTML
        let foundStart = body.indexOf('{{')
        while(foundStart != -1) {
            let foundEnd = body.substr(foundStart, body.length).indexOf('}}')
            let varb = body.substr(foundStart + 2, foundEnd - 2)
            let value = eval('shellObj.' + varb)
            body = body.substr(0, foundStart) + value + body.substr(foundStart + foundEnd + 2)
            document.body.innerHTML = body
            foundStart = body.indexOf('{{')
        }
    }
    parseHtmlElements(shellObj){

        // s-img -> img = chargement différé des images
        let body = document.body.innerHTML
        let foundStart = body.indexOf('<s-img')
        while(foundStart != -1) {
            let foundEnd = body.substr(foundStart, body.length).indexOf('>')
            let varb = body.substr(foundStart+3, foundEnd - 1)
            let value = '<'+body.substr(foundStart+3, foundStart + foundEnd + 1)
            body = body.substr(0, foundStart) + value + body.substr(foundStart + foundEnd + 1)
            document.body.innerHTML = body
            foundStart = body.indexOf('<s-img')
        }
    }
    setMeta(type, value) {
        if (type === 'title') {
            document.title = value
        }
        else if (type === 'favicon') {
            let link = document.createElement('link')
            link.rel = 'icon'
            link.type = 'image/png'
            link.href = value
            document.head.appendChild(link)
        }
    }
}

let $ = (eltPointer) => {
    if(eltPointer.substr(0,1) == '#') {
        return document.getElementById(eltPointer.substr(1,eltPointer.length))
    }
}
let show = (eltPointer) => {
    $(eltPointer).style.display = ''
}
let hide = (eltPointer) => {
    $(eltPointer).style.display = 'none'
}
let content = (eltPointer, content) => {
    $(eltPointer).innerHTML = content
}
let enable = (eltPointer) => {
    $(eltPointer).disabled = false
}
let disable = (eltPointer) => {
    $(eltPointer).disabled = true
}
