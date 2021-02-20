Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function createModalFooter(buttons = []) {
    if (buttons.length == 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn =document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}

function createModal (options) {
    const modal = document.createElement('div')

    modal.classList.add('vmodal')


    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || '600px'}">
                <div class="modal-header">
                    <span class="modal-title">${options.title}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''} 

                </div>
                <div class="modal-body" data-content>
                    ${options.content}
                </div>

            </div>
        </div>
    `)
    const footer = createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))

    document.body.appendChild(modal)
    return modal
}

$.modal = (options) => {
    let closing = false,
        destroyed = false
    const ANIMATION_SPEED = 200,
          $modal = createModal(options),
          modal = {
              open() {
                  if (destroyed) {
                      return console.log('Modal is destroyed')
                  }
                  !closing && $modal.classList.add('open')
              },
              close() {
                  closing = true
                  $modal.classList.remove('open')
                  $modal.classList.add('hide')
                  setTimeout(() => {
                      $modal.classList.remove( 'hide')
                      closing = false
                      if (options.onClose === 'function') {
                          options.omClose()
                      }
                  }, ANIMATION_SPEED)
              }
          }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.remove()
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })


}

