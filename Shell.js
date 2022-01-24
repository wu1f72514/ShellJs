const fileName = 'Shell.js'

const apiVisitorAdd = 'http://127.0.0.1:26002/visitors'

const errorUrlExtNotFound = 'ERREUR [{fileName}]: L\'url "{url}" ne désigne pas un fichier valide. Impossible de déterminer l\'extension'
const errorUrlExtNotManaged = 'ERREUR [{fileName}]: L\'extension de fichier "{ext}" n\est pas gérée'
/*
* TODOs
* reactive elements (like vuejs) = shell reactives => {sr{ element }sr} -> remplacer par <span id="sr1">valeur element</span> / alimenter table associative qui associe sr1 et element + surveiller changement d'element pour maj sr1
* if s-if="" (reactive), boucles s-for="" (reactive), alimentation attributes s:="element" (reactive)
*
* */

class Shell{
    buildPage(){
        let html = new Html()
        let api = new Api()

        // change page elements
        let promiseConfig = api.newPromise('config.json', 'GET')
        promiseConfig.then((val) => {
            this.config = JSON.parse(val)
            html.setMeta('title', this.config.app.fullname)
            html.setMeta('favicon', this.config.app.favicon)
            html.parseTags(this)
            html.parseHtmlElements(this)

            // todo trace visitor est lié à l'app et pas à Shelljs, il faudra déporter cela

            // trace visitor
            let promiseTraceVisitor = api.newPromise(apiVisitorAdd, 'POST', {
                location: window.location.href,
                innerScreenSize: window.innerWidth+'x'+window.innerHeight,
                outerScreenSize: window.outerWidth+'x'+window.outerHeight,
                referer: window.opener,
                os: navigator.platform,
                browser: navigator.userAgent,
                isFrameOf: window.frameElement,
                isFullScreen: window.fullScreen,
                decalXY: window.screenX+'x'+window.screenY,
            })
            promiseTraceVisitor.catch((error) => {
                if(error == 'NETWORK_OR_CORS_PROBLEM') {
                    content('#errorCorsNetworkName', 'Expérience utilisateur')
                    show('#errorCorsNetwork')
                }
                else{
                    content('#errorApiGenericName', 'Expérience utilisateur')
                    content('#errorApiGenericError', error)
                    show('#errorApiGeneric')
                }
                disable('#cta_step_chx_date')
                $('#cta_step_chx_date').title = 'Vous ne pouvez pas organiser de repas pour le moment / Service en dérangement'
            })
        }).catch((error) => {
            // todo gérer cas erreur
            console.error(error)
        })
        pageJs()
    }

}

// FIXME ajout de script js empeche utilisation / test avec promise
// const addFile = (url) => {
//     let posPoint = url.lastIndexOf('.')
//     if(posPoint == -1){
//         console.error(errorUrlExtNotFound.replace('{fileName}', fileName).replace('{url}', url))
//         return false
//     }
//     let type = url.substring(posPoint+1, url.length)
//     if(type == 'js'){
//         let script = document.createElement('script')
//         script.src = url
//         document.head.appendChild(script)
//         return true
//     }
//     if(type == 'css'){
//         let link = document.createElement('link')
//         link.rel = 'stylesheet'
//         link.href = url
//         document.head.appendChild(link)
//         return true
//     }
//     console.error(errorUrlExtNotManaged.replace('{fileName}', fileName).replace('{ext}', type))
//     return false
// }
let shell = new Shell()