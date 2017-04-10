export function findDataOnParent (el, dataName) {
  let node = el
  while (node) {
    if (node.dataset[dataName]) return node.dataset[dataName]
    node = node.parentElement
  }
}

export function findParentByClassName (el, className) {
  let node = el
  while (node) {
    for (let i of node.classList) {
      if (i === className) return node
    }
    node = node.parentElement
  }
}

export function findAllSiblings (el) {
  let siblings = []
  let node = el
  while (node.nextElementSibling) {
    siblings.push(node.nextElementSibling)
    node = node.nextElementSibling
  }
  return siblings
}
