!function(){if("function"==typeof window.CustomEvent)return!1;window.CustomEvent=function(e,t){t=t||{bubbles:!1,cancelable:!1,detail:null};var s=document.createEvent("CustomEvent");return s.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),s}}();const templateSelect=(e=[],t="Выберите из списка")=>{let s=[];return e.forEach((e=>{let i="";e===t&&(i=" select__item_selected"),s.push(`<li class="select__item${i}" data-select="item">${e}</li>`)})),`\n    <div class="select__backdrop" data-select="backdrop"></div>\n    <button type="button" class="select__trigger" data-select="trigger">\n      ${t}\n    </button>\n    <div class="select__dropdown">\n      <ul class="select__items">\n        ${s.join("")}\n      </ul>\n    </div>`};class CustomSelect{constructor(e,t){this._$main=document.querySelector(e),this._config=t||{},this._config.data&&this._render(),this._$trigger=this._$main.querySelector('[data-select="trigger"]'),this._addEventListener()}_isShow(){return this._$main.classList.contains("select_show")}_changeItem(e){if(!e.classList.contains("select__item_selected")){const t=this._$main.querySelector(".select__item_selected");t&&t.classList.remove("select__item_selected"),e.classList.add("select__item_selected"),this._$trigger.textContent=e.textContent,this._$main.dispatchEvent(this._changeValue),this._config.onSelected&&this._config.onSelected(e)}}_eventHandler(e){let t=e.target,s=t.dataset.select;s||(t=t.closest("[data-select]"),s=t.dataset.select),"trigger"===s?this.toggle():"item"===s?(this._changeItem(t),this.hide()):"backdrop"===s&&this.hide()}_addEventListener(){this._eventHandler=this._eventHandler.bind(this),this._$main.addEventListener("click",this._eventHandler),this._changeValue=new CustomEvent("select.change")}_render(){this._$main.classList.contains("select")||this._$main.classList.add("select"),this._$main.innerHTML=templateSelect(this._config.data,this._config.defaultValue)}show(){this._$main.classList.add("select_show")}hide(){this._$main.classList.remove("select_show")}toggle(){this._isShow()?this.hide():this.show()}destroy(){this._$main.removeEventListener("click",this._eventHandler),this._$main.innerHTML=""}selectedItem(e){if("object"==typeof e){if(e.value)this._$main.querySelectorAll('[data-select="item"]').forEach((t=>{t.textContent.trim()!==e.value.toString()||this._changeItem(t)}));else if(e.index>=0){const t=this._$main.querySelectorAll('[data-select="item"]')[e.index];this._changeItem(t)}return this.selectedItem()}let t=-1,s="";return this._$main.querySelectorAll('[data-select="item"]').forEach(((e,i)=>{e.classList.contains("select__item_selected")&&(t=i,s=e.textContent)})),{index:t,value:s}}}