import mammoth from 'mammoth'

export const compareStrings = (str1, str2) => {
    return str1.trim() === str2.trim()
}

export const changeSlug = (dataString = '') => {
    if (dataString !== '') {
        //Đổi chữ hoa thành chữ thường
        let slug = dataString.toLowerCase()
        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        slug = slug.replace(/đ/gi, 'd')
        //Xóa các ký tự đặt biệt
        slug = slug.replace(
            /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
            '',
        )
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, '-')
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-')
        slug = slug.replace(/\-\-\-\-/gi, '-')
        slug = slug.replace(/\-\-\-/gi, '-')
        slug = slug.replace(/\-\-/gi, '-')
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@'
        slug = slug.replace(/\@\-|\-\@|\@/gi, '')
        //In slug ra textbox có id “slug”
        return slug
    } else {
        return {
            errorCode: 'UNETI_404',
            message: 'ERROR: Invalid data string provided!',
        }
    }
}

export const convertDataFileToBase64 = (dataFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            const base64String = reader.result
            resolve(base64String)
        }

        reader.onerror = (error) => {
            reject(error)
        }

        if (dataFile) {
            reader.readAsDataURL(dataFile)
        } else {
            reject(new Error('File not provided.'))
        }
    })
}

export const convertBufferToBase64 = (buffer) => {
    let binary = ''
    let bytes = new Uint8Array(buffer)
    let len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
}

export const convertDocxToText = (arrayBuffer) => {
    return new Promise((resolve, reject) => {
        const options = {
            convertImage: mammoth.images.inline((element) => {
                return element.read('base64').then((image) => {
                    return {
                        src: `data:${element.contentType};base64,${image}`,
                    }
                })
            }),
        }

        mammoth
            .extractRawText({ arrayBuffer: arrayBuffer }, options)
            .then((result) => {
                resolve(result.value)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const convertRtfToText = (text) => {
    const pattern =
        /\\([a-z]{1,32})(-?\d{1,10})?[ ]?|\\'([0-9a-f]{2})|\\([^a-z])|([{}])|[\r\n]+|(.)/gi
    const destinations = new Set([
        'aftncn',
        'aftnsep',
        'aftnsepc',
        'annotation',
        'atnauthor',
        'atndate',
        'atnicn',
        'atnid',
        'atnparent',
        'atnref',
        'atntime',
        'atrfend',
        'atrfstart',
        'author',
        'background',
        'bkmkend',
        'bkmkstart',
        'blipuid',
        'buptim',
        'category',
        'colorschememapping',
        'colortbl',
        'comment',
        'company',
        'creatim',
        'datafield',
        'datastore',
        'defchp',
        'defpap',
        'do',
        'doccomm',
        'docvar',
        'dptxbxtext',
        'ebcend',
        'ebcstart',
        'factoidname',
        'falt',
        'fchars',
        'ffdeftext',
        'ffentrymcr',
        'ffexitmcr',
        'ffformat',
        'ffhelptext',
        'ffl',
        'ffname',
        'ffstattext',
        'field',
        'file',
        'filetbl',
        'fldinst',
        'fldrslt',
        'fldtype',
        'fname',
        'fontemb',
        'fontfile',
        'fonttbl',
        'footer',
        'footerf',
        'footerl',
        'footerr',
        'footnote',
        'formfield',
        'ftncn',
        'ftnsep',
        'ftnsepc',
        'g',
        'generator',
        'gridtbl',
        'header',
        'headerf',
        'headerl',
        'headerr',
        'hl',
        'hlfr',
        'hlinkbase',
        'hlloc',
        'hlsrc',
        'hsv',
        'htmltag',
        'info',
        'keycode',
        'keywords',
        'latentstyles',
        'lchars',
        'levelnumbers',
        'leveltext',
        'lfolevel',
        'linkval',
        'list',
        'listlevel',
        'listname',
        'listoverride',
        'listoverridetable',
        'listpicture',
        'liststylename',
        'listtable',
        'listtext',
        'lsdlockedexcept',
        'macc',
        'maccPr',
        'mailmerge',
        'maln',
        'malnScr',
        'manager',
        'margPr',
        'mbar',
        'mbarPr',
        'mbaseJc',
        'mbegChr',
        'mborderBox',
        'mborderBoxPr',
        'mbox',
        'mboxPr',
        'mchr',
        'mcount',
        'mctrlPr',
        'md',
        'mdeg',
        'mdegHide',
        'mden',
        'mdiff',
        'mdPr',
        'me',
        'mendChr',
        'meqArr',
        'meqArrPr',
        'mf',
        'mfName',
        'mfPr',
        'mfunc',
        'mfuncPr',
        'mgroupChr',
        'mgrow',
        'mhideBot',
        'mhideLeft',
        'mhideRight',
        'mhideTop',
        'mhtmltag',
        'mlim',
        'mlimloc',
        'mlimlow',
        'mlimlowPr',
        'mlimupp',
        'mlimuppPr',
        'mm',
        'mmaddfieldname',
        'mmath',
        'mmathPict',
        'mmathPr',
        'mmaxdist',
        'mmc',
        'mmcJc',
        'mmconnectstr',
        'mmconnectstrdata',
        'mmcPr',
        'mmcs',
        'mmdatasource',
        'mmheadersource',
        'mmmailsubject',
        'mmodso',
        'mmodsofilter',
        'mmodsofldmpdata',
        'mmodsomappedname',
        'mmodsoname',
        'mmodsorecipdata',
        'mmodsosort',
        'mmodsosrc',
        'mmodsotable',
        'mmodsoudl',
        'mmodsoudldata',
        'mmodsouniquetag',
        'mmPr',
        'mmquery',
        'mmr',
        'mnary',
        'mnaryPr',
        'mnoBreak',
        'mnum',
        'mobjDist',
        'moMath',
        'moMathPara',
        'moMathParaPr',
        'mopEmu',
        'mphant',
        'mphantPr',
        'mplcHide',
        'mpos',
        'mr',
        'mrad',
        'mradPr',
        'mrPr',
        'msepChr',
        'mshow',
        'mshp',
        'msPre',
        'msPrePr',
        'msSub',
        'msSubPr',
        'msSubSup',
        'msSubSupPr',
        'msSup',
        'msSupPr',
        'mstrikeBLTR',
        'mstrikeH',
        'mstrikeTLBR',
        'mstrikeV',
        'msub',
        'msubHide',
        'msup',
        'msupHide',
        'mtransp',
        'mtype',
        'mvertJc',
        'mvfmf',
        'mvfml',
        'mvtof',
        'mvtol',
        'mzeroAsc',
        'mzeroDesc',
        'mzeroWid',
        'nesttableprops',
        'nextfile',
        'nonesttables',
        'objalias',
        'objclass',
        'objdata',
        'object',
        'objname',
        'objsect',
        'objtime',
        'oldcprops',
        'oldpprops',
        'oldsprops',
        'oldtprops',
        'oleclsid',
        'operator',
        'panose',
        'password',
        'passwordhash',
        'pgp',
        'pgptbl',
        'picprop',
        'pict',
        'pn',
        'pnseclvl',
        'pntext',
        'pntxta',
        'pntxtb',
        'printim',
        'private',
        'propname',
        'protend',
        'protstart',
        'protusertbl',
        'pxe',
        'result',
        'revtbl',
        'revtim',
        'rsidtbl',
        'rxe',
        'shp',
        'shpgrp',
        'shpinst',
        'shppict',
        'shprslt',
        'shptxt',
        'sn',
        'sp',
        'staticval',
        'stylesheet',
        'subject',
        'sv',
        'svb',
        'tc',
        'template',
        'themedata',
        'title',
        'txe',
        'ud',
        'upr',
        'userprops',
        'wgrffmtfilter',
        'windowcaption',
        'writereservation',
        'writereservhash',
        'xe',
        'xform',
        'xmlattrname',
        'xmlattrvalue',
        'xmlclose',
        'xmlname',
        'xmlnstbl',
        'xmlopen',
    ])
    const specialchars = {
        par: '\n',
        sect: '\n\n',
        page: '\n\n',
        line: '\n',
        tab: '\t',
        emdash: '\u2014',
        endash: '\u2013',
        emspace: '\u2003',
        enspace: '\u2002',
        qmspace: '\u2005',
        bullet: '\u2022',
        lquote: '\u2018',
        rquote: '\u2019',
        ldblquote: '\u201C',
        rdblquote: '\u201D',
    }

    const stack = []
    let ignorable = false
    let ucskip = 1
    let curskip = 0
    const out = []

    for (const match of text.matchAll(pattern)) {
        const [_, word, arg, hex, char, brace, tchar] = match

        if (brace) {
            curskip = 0
            if (brace === '{') {
                // Push state
                stack.push([ucskip, ignorable])
            } else if (brace === '}') {
                // Pop state
                ;[ucskip, ignorable] = stack.pop()
            }
        } else if (char) {
            // \x (not a letter)
            curskip = 0
            if (char === '~') {
                if (!ignorable) {
                    out.push('\xA0')
                }
            } else if (['{}\\'].includes(char)) {
                if (!ignorable) {
                    out.push(char)
                }
            } else if (char === '*') {
                ignorable = true
            }
        } else if (word) {
            // \foo
            curskip = 0
            if (destinations.has(word)) {
                ignorable = true
            } else if (ignorable) {
                // Do nothing
            } else if (specialchars.hasOwnProperty(word)) {
                out.push(specialchars[word])
            } else if (word === 'uc') {
                ucskip = parseInt(arg, 10)
            } else if (word === 'u') {
                let c = parseInt(arg, 10)
                if (c < 0) {
                    c += 0x10000
                }
                if (c > 127) {
                    out.push(String.fromCharCode(c))
                } else {
                    out.push(String.fromCharCode(c))
                }
                curskip = ucskip
            }
        } else if (hex) {
            // \'xx
            if (curskip > 0) {
                curskip -= 1
            } else if (!ignorable) {
                const c = parseInt(hex, 16)
                if (c > 127) {
                    out.push(String.fromCharCode(c))
                } else {
                    out.push(String.fromCharCode(c))
                }
            }
        } else if (tchar) {
            if (curskip > 0) {
                curskip -= 1
            } else if (!ignorable) {
                out.push(tchar)
            }
        }
    }

    return out
        .join('')
        .replaceAll('\n', '')
        .replaceAll('\u0000', '')
        .replaceAll('', '_')
}
