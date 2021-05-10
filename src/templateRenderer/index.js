import { mapFieldAttributes } from '../helpers/index.js'
// import { fetchData } from '../utils/index.js'
 
const baseInput = ({field, itemsByLine, step}) => {
    const input =
    `<div id="field_${field.key}" style="${field.fullWidth ? `grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2};` : ''}width: auto;text-align:left;" class="fieldBloc">
        <label style="margin-left:0;">${field.label} ${field.validation && field.validation.includes('required') ? '*' : ''}</label>
        <input autocomplete="off" aria-autocomplete="off" type=${field.type} placeholder="${field.placeholder || ''}" id="--swInput${field.key}--" value="${field.value}" class="swInput mt-2"/>
    </div>`

    return input
}

const passwordInput = ({field, itemsByLine, step}) => {
    const input =
    `<div id="field_${field.key}" style="${field.showConfirmPassword ? `grid-column: 1 / 2` : ''} ${field.fullWidth ? `grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2};` : ''}width: auto;text-align:left;" class="fieldBloc">
        <label style="margin-left:0;">${field.label} ${field.validation && field.validation.includes('required') ? '*' : ''}</label>
        <input autocomplete="off" aria-autocomplete="off" type="password" placeholder="••••••••••" id="--swInput${field.key}--" value="${field.value}" class="swInput mt-2"/>
    </div>
    ${field.confirmPassword ? `<div id="field_${field.key}--confirm" style="${field.fullWidth ? `grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2};` : ''}width: auto;text-align:left;" class="fieldBloc">
        <label style="margin-left:0;">Confirm password *</label>
        <input autocomplete="off" aria-autocomplete="off" type="password" placeholder="••••••••••" id="--swInput${field.key}--confirm--" value="${field.value}" class="swInput mt-2"/>
        
    </div>` : ''}`

    return input
}


const selectInput = ({field, itemsByLine, step}) => {
    const input = 
    `<div id="field_${field.key}" style="${field.fullWidth ? `grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2};` : ''}line-break:before;width:auto;text-align:left;"  class="fieldBloc">
        <label style="margin-left:0;" class="mb-2">${field.label} ${field.validation && field.validation.includes('required') ? '*' : ''}</label>
        <div class="select mt-2">
            <select name="slct" id="--swInput${field.key}--">
                ${field.options.map(option => `<option ${option.value == field.value ? 'selected' : ''} value="${option.value}">${option.label}</option>`).join('')}
            </select>
        </div>
    </div>`

    return input
}

const checkboxInput = ({field, itemsByLine, step}) => {
    const input = 
    `<div id="field_${field.key}" style="${field.fullWidth ? `grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2};` : ''}width: auto; display: flex; gap: 1em;align-items:center;justify-content: space-between" class="fieldBloc">
        <label>${field.label} ${field.validation && field.validation.includes('required') ? '*' : ''}</label>
        <input type=${field.type} value="${field.value}" id="--swInput${field.key}--" ${field.type === 'checkbox' && field.value ? `checked` : ''} class="mt-2"/>
    </div>`

    return input
}

const rangeInput = ({field, itemsByLine, step}) => {
    const input = 
    `<div id="field_${field.key}" style="${field.fullWidth ? `grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2};` : ''}width: auto;text-align:left; display: flex;flex-direction: column;" class="fieldBloc">
        <label style="margin-left:0;">${field.label}  ${field.validation && field.validation.includes('required') ? '*' : ''}</label>
        <div style="display:flex;flex-direction:column;justify-content: center;height: auto;margin: auto 0;">
            <label style="text-align:center;margin-bottom: 5px;" id="swRangeVal${field.key}"></label>
            <input autocomplete="off" aria-autocomplete="off" type=${field.type}  placeholder="${field.placeholder || ''}" id="--swInput${field.key}--" value="${field.value}" class="rangeSlider mt-2" oninput="document.getElementById('swRangeVal${field.key}').innerHTML = document.getElementById('--swInput${field.key}--').value"/>
        </div>
    </div>`

    return input
}

// CUSTOM DATA FORMATS

const mapPagination = ({rowsPerPage, totalRows, field}) => {
    const pages = []
    while(pages.length < Math.ceil(totalRows / rowsPerPage)) pages.push({ id: `${field.key}__dataTablePaginationItem`, pageNumber: pages.length + 1})
    return '' + 
    `<ul class="pagination">
        <li><a href="#" class="prev" id="${field.key}__dataTablePaginationPrev">< Prev</a></li>
        
        ${pages.map((page) => {
            return ''+
            `<li id="${page.id}"  page-nb="${page.pageNumber}" class="pageNumber ${page.pageNumber == 1 ? 'active' : ''}"><a href="#">${page.pageNumber}</a></li>`
        }).join('')}
     
        <li><a href="#" class="next" id="${field.key}__dataTablePaginationNext">Next ></a></li>
    </ul>`
}
const dataTable = ({field, itemsByLine, step, cellRenderers}) => {
    const dataTable =
    `<div id="field_${field.key}" style="grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2}; width: auto; display: flex;flex-direction:column; gap: .4em;align-items:center;justify-content: space-between" class="fieldBloc">
        <div style="width: 100%;display: flex;justify-content: space-between;align-items:center;padding: 1em 0 0.6em 0;">
            <div style="display: flex; flex-direction: column; justify-content: space-between;gap: .5em;">
                <label style="margin-left:0; font-size: 18px;text-transform: uppercase;display: flex;align-items:center;gap: .5em;"> <i class="far fa-list-alt"></i> <span>${field.label}  ${field.validation && field.validation.includes('required') ? '*' : ''}</span></label>
                <div style="width: 100%;margin-left: 0;text-align:left; font-size: 12px;text-transform: uppercase;">Selected : <span id="${field.key}__dataTableSelectedNb">0</span> / ${field.data.length}</div>
            </div>
            <input id="${field.key}__search__input" placeholder="Search ..." class="swInput" style="max-width: 250px;height: 40px;margin-top: 0 !important;" onfocusin="document.getElementById('${field.key}__search__input').classList.add('swFocus')" onfocusout="document.getElementById('${field.key}__search__input').classList.remove('swFocus')"/>
        </div>
        <div id="--swInput${field.key}--" value="${field.data && ['object', 'array'].includes(typeof data) ? JSON.stringify(data): field.selectMode == 'multiple' ? '[]' : '{}'}" class="limiter">
            <div class="data-table" style="display: grid; grid-template-columns: repeat(1, 1fr);">
                <div class="table-header" style="grid-template-columns: repeat(${field.gridSize ? field.gridSize + 1 : field.columns.length * 4 + 1}, 1fr);">
                    <div class="column selectorCol">
                        ${field.selectMode == 'multiple' ? `<input id="${field.key}__tableGlobalSelector" type="checkbox"/>` : ''}
                    </div>
                    ${field.columns.map(col => {
                        return '' + `
                        <div id="${field.key}__headerCol__${col.key}" column-key="${col.key}" sort=""  class="column" ${col.colSize ? `style="grid-column: auto / span ${col.colSize}"` : ''}>
                            <div style="display: flex;align-items:center;justify-content:center;gap: .5em;color: #fff;cursor:pointer;">
                                ${col.label}
                                <i class="fas fa-sort"></i>
                            </div>
                        </div>`
                    }).join('')}
                </div>
                
                <div class="table-content" style="max-height: ${field.tableMaxHeight || '200px'};min-height: 100px;grid-template-rows: auto auto 0px;">

                    ${field.data.map(item => {
                        return '' + `
                        <div class="table-row ${field.key}__row_item" row-value="${JSON.stringify(item).replaceAll(`"`, `'`)}" style="grid-template-columns: repeat(${field.gridSize ? field.gridSize + 1 : field.columns.length * 4 + 1}, 1fr);">
                            <div class="column selectorCol">
                                <input value="${JSON.stringify(item).replaceAll(`"`, `'`)}" id="${field.key}__formDataSelectRow" name="${field.key}__formDataSelect" type="${field.selectMode == 'multiple' ? 'checkbox' : 'radio'}"/>
                            </div>
                            ${field.columns.map(col => {
                                if(col.key  in item) {
                                    return '' + 
                                    `
                                    <div class="column" data-title="${col.label}" data-value="${item[col.key]}" ${col.colSize ? `style="grid-column: auto / span ${col.colSize}"` : ''}>
                                        ${col.cellRenderer && cellRenderers[col.cellRenderer] ? cellRenderers[col.cellRenderer](item[col.key]) : item[col.key]}
                                    </div>
                                    `
                                }
                            }).join('')}
                            
                        </div>`
                    }).join('')}
                </div>
            </div>
        </div>
    </div>
    `

    /*<div class="pagination-bloc">
                ${mapPagination({rowsPerPage: 20, totalRows: field.data.length, field})}
                </div> */
    return dataTable
}

const radioInput = ({field, itemsByLine, step}) => {
    const input = 
    `<div id="field_${field.key}" style="${field.fullWidth ? `grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2};` : ''}display: flex; flex-direction: column;width: auto;text-align:left;" class="fieldBloc">
        <label style="align-self: start">Choose ${field.label} ${field.validation && field.validation.includes('required') ? '*' : ''}</label>
        <div style="padding: 1em;justify-self: center;display: flex; justify-content: space-evenly;flex-wrap: wrap;margin-top: auto;height: 100%;align-items: center; gap: 1.2em;">
            ${field.options.map(option => {
                return `<div style="display: flex; align-items: center; gap: .5em;">
                    <input ${mapFieldAttributes({field})} type="radio" name="${field.key}" value="${option.value}" id="--swInput${field.key}--" ${field.value == option.value ? `checked` : ''}/>
                    <label>${option.label}</label>
                </div>`
            }).join('')}
        </div>
    </div>`

    return input
}

const textAreaInput = ({field, itemsByLine, step}) => {
    var resizeAttribute = 'None';

    if (field.resizeVertically && field.resizeHorizontally) {
        resizeAttribute = 'Both';
    } else if (field.resizeVertically) {
        resizeAttribute = 'Vertical';
    } else if (field.resizeHorizontally) {
        resizeAttribute = 'Horizontal';
    }

    const input = 
    `<div id="field_${field.key}" style="${field.fullWidth ? `grid-column: auto / span ${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2};` : ''}width: auto;text-align:left;" class="fieldBloc">
        <label style="margin-left:0;">${field.label} ${field.validation && field.validation.includes('required') ? '*' : ''}</label>
        <textarea autocomplete="off" aria-autocomplete="off" cols="${field.cols ? field.cols : 'auto'}" rows="${field.rows ? field.rows : 5}" placeholder="${field.placeholder ? field.placeholder : ''}" id="--swInput${field.key}--" class="swTextArea swTextAreaResize${resizeAttribute} mt-2">${field.value}</textarea>
    </div>`

    return input
}

// Form renderer


const formProgressRenderer = ({stepper}) => {
    const stepsLenArray = []
    for(let i = 0; i < stepper.total; i++) stepsLenArray.push(i)
    const formProgress =
    `<div class="progress-container">
        <div class="progress" id="progress" style="width:${((stepper.current - 1) / (stepper.total - 1)) * 100}%;"></div>
            ${stepsLenArray.map((val, key) => {
                return `<div id="progressStep${key + 1}" class="circle ${key + 1 < stepper.current ? 'done' : key + 1 === stepper.current ? 'active' : ''}">${key + 1 < stepper.current ? '✓' : key + 1}</div>`
            }).join('')}
        </div>
    </div>`

    return formProgress
}

const extraStylesheetsRenderer = () => {
    return '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />'
}


export const formTemplateRenderer = ({step, fields, itemsByLine, themeOptions, stepper, cellRenderers}) => {
    //  ${step.title ? `<div style="${themeOptions && themeOptions.darkMode ? 'color:#fff;' : ''}" class="w-full text-center">${step.title}</div>` : ''}
    let formFields = step && step.fields ? step.fields : fields

    const formTemplate =
    extraStylesheetsRenderer() +
    `<div class="swFormBloc" style="display: grid;grid-template-columns: repeat(${step && step.itemsByLine ? step.itemsByLine : itemsByLine ? itemsByLine : 2}, 1fr);grid-gap: 1em;padding-bottom: 1rem;margin-top: 20px;max-height:${themeOptions && themeOptions.maxHeight ? themeOptions.maxHeight : '65vh;'};padding-right: 10px;overflow-y: scroll">
        ${formFields.map(field => {
            if (field.type === 'select') return selectInput({field, itemsByLine, step})
            else if (field.type === 'checkbox') return checkboxInput({field, itemsByLine, step})
            else if (field.type === 'range') return rangeInput({field, itemsByLine, step})
            else if (field.type === 'radio') return radioInput({field, itemsByLine, step})
            else if (field.type === 'password') return passwordInput({field, itemsByLine, step})
            else if (field.type === 'data-table') return dataTable({field, itemsByLine, step, cellRenderers})
            else if (field.type === 'textarea') return textAreaInput({field, itemsByLine, step})
            else return baseInput({field, itemsByLine, step})
        }).join('')}
    </div>`

    return (stepper && step ? formProgressRenderer({stepper}) : '') + formTemplate
}