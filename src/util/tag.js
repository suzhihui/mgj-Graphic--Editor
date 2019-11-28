/**
 *
 *
 * @param {String|HTMLElelment} tagName A string or HTMLElement
 * @param {Object} [options={}] elementProperties
 * @returns {HTMLElement & elementCustomProps}
 */
function tag(tagName, options = {}) {
  const isstanceofHtmlElement = tagName instanceof HTMLElement;
  if (!isstanceofHtmlElement && typeof tagName !== 'string') throw new Error(`{tag} is invalid value of tag`)
  const el = isstanceofHtmlElement ? tagName : document.createElement(tagName)
  // 保存原有的事件
  el.oldEventListener    = el.addEventListener.bind(el)
  el.addEventListener    = addEventListener.bind(el)
  el.assignRemovedEvents = assignRemovedEvents.bind(el);
  el.append              = append.bind(el)
  el.get                 = get.bind(el)
  el.getAll              = getAll.bind(el);
  el.removeEvents        = removeEvents.bind(el);
  el.remove              = remove.bind(el);
  el.restore             = restore.bind(el);

  return el

  /**
   *  移除事件
   *
   * @param {String|String[]|null} eventType
   */
  function removeEvents(eventType) {
    const eventFunctions = this.eventFunctions
    if (!eventFunctions) return;
    if (eventType) {
      // String | String[]
      for(let event of eventFunctions) {
        if(Array.isArray(eventType) && eventType.indexOf(event.type)) {
          this.removeEventListener(event.type, event.listener)
        }
        else if (typeof eventType === 'string' && event.type === eventType) {
          this.removeEventListener(event.type, event.listener)
        }
      }
      
      return
    }

    // null
    for(let event of eventFunctions) {
      el.removeEventListener(event.type, event.listener)
    }
    

  }
  
  // 追加事件
  function addEventListener(type, listener, options) {
    if(!this.eventFunctions) this.eventFunctions = []
    // 参数赋值给最后事件集合的最后一个
    this.eventFunctions[this.eventFunctions.length] = {
      type,
      listener,
      options
    }
    // 执行原有的事件
    this.oldEventListener(type, listener, options)
  }

  // 移除节点
  function remove() {
    if (this.parentElement) {
      this.removeEvents()
      this.oldParentElement = this.parentElement
      this.parentElement.removeChild(this)
    }
  }

  // 恢复节点
  function restore(parentElement) {
    parentElement = parentElement || this.oldParentElement || null
    if(parentElement && !this.parentElement) {
      this.assignRemovedEvents()
      parentElement.appendChild(this)
    }
  }

  /**
   *
   *
   * @param {String|String[]|null} eventType
   */
  function assignRemovedEvents(eventType) {
    const eventFunctions = this.eventFunctions
    if(!eventFunctions) return
    // string|string[]
    if(eventType) {
      for(let event of eventFunctions) {
        if (Array.isArray(eventType) && eventType.indexOf(event.type)) {
          this.oldEventListener(event.type, event.listener, event.options)
        } 
        else if (typeof eventType === 'string' && event.type === eventType) {
          this.oldEventListener(event.type, event.listener, event.options)
        }
      }
      
      return
    }
    // null
    for(let event of event) {
      this.oldEventListener(event.type, event.listener)
    }
  }

  /**
   * 
   *
   * @param {Node} nodes
   */
  function append(...nodes) {
    nodes.map(node => {
      if (node instanceof Node) {
        this.appendChild(node)
        if (node instanceof HTMLElement && node.id) {
          el[node.id] = node
        }
      }
    })

    return this
  }

  /**
   * get first mathing element from DOM
   * @param {String} selector CSS selector 
   * @returns {HTMLElement}
   */
  function get(selector) {
    return this.querySelector(selector);
  }

  /**
   * get first mathing element from DOM
   * @param {String} selector CSS selector 
   * @returns {HTMLElement}
   */
  function getAll(selector) {
    return this.querySelectorAll(selector);
  }
}

export default tag