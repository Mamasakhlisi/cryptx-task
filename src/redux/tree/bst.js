class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let tree = this.root;

    while (true) {
      if (value < tree.value) {
        if (!tree.left) {
          tree.left = newNode;
          return this;
        }
        tree = tree.left;
      } else {
        if (!tree.right) {
          tree.right = newNode;
          return this;
        }
        tree = tree.right;
      }
    }
    return this;
  }

  lookup(value) {
    if (!this.root) {
      return false;
    }
    let tree = this.root;

    while (tree) {
      if (value < tree.value.id) {
        tree = tree.left;
      } else if (value > tree.value.id) {
        tree = tree.right;
      } else if (tree.value.id === value) {
        return tree;
      }
    }

    return false;
  }

   convertTreeToList() {
    var stack = [], array = [], hashMap = {};
    stack.push(this.root);

    while(stack.length !== 0) {
        var node = stack.pop();
        if(node.children === null) {
           this.visitNode(node, hashMap, array);
        } else {
            for(var i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }

    return array;
}

 visitNode(node, hashMap, array) {
    if(!hashMap[node.data]) {
        hashMap[node.data] = true;
        array.push(node);
    }
}

  remove(value) {
    if (!this.root) {
      return false;
    }

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        //We have a Match!
        //Option 1: No right child
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            //if parent > current value, make current left child a child of parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;

              //if parent < current value, make left child a right child of parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }

          //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if (parentNode === null) {
            this.root = currentNode.right;
          } else {
            //if parent > current, make right child of the left the parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;

              //if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }

          //Option 3: Right child that has a left child
        } else {
          //Find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if (parentNode === null) {
            this.root = leftmost;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
        return true;
      }
    }
  }
}

const tree = new BinarySearchTree();

tree.insert({id:1, title:"ფოლდერი 1"});
tree.insert({id:2, title:"ფოლდერი 2"});
tree.insert({id:3, title:"ფოლდერი 3"});

console.log(JSON.stringify(tree.lookup(1), null, 2))
