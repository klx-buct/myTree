import React from 'react';
import TreeNode from './TreeNode';
import {
  convertTreeToEntities,
} from './util'


class Tree extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      halfCheckedKeys: [],
      checkedKeys: [],
      expandedKeys: [...this.props.defaultExpandedKeys],
    })

    this.rendertreeNode = this.renderTreeNode.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
    this.updateExpanded = this.updateExpanded.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const treeNodes = props.children;
    const entities = {};
    for(let i = 0, len = treeNodes.length; i < len; i++) {
      const node = treeNodes[i];
      convertTreeToEntities(node, i+"", entities, null);
    }
    const newState = {   
      keyEntities: entities,
      treeNodes: treeNodes
    }
    return newState;
  }


  renderTreeNode(child, key){
    return React.cloneElement(child, {
      Key: key,
      initKey: child.key,
      isHalfChecked: this.state.halfCheckedKeys.includes(key),
      isChecked: this.state.checkedKeys.includes(key),
      isExpanded: this.state.expandedKeys.includes(child.key),
      halfCheckedKeys: this.state.halfCheckedKeys,
      checkedKeys: this.state.checkedKeys,
      expandedKeys: this.state.expandedKeys,
      keyEntities: this.state.keyEntities,
      onNodeClick: this.onNodeClick,
      updateExpanded: this.updateExpanded,
      isSingle: !('children' in child.props)
    })
  }

  onNodeClick(halfCheckedKeys, checkedKeys) {
    this.setState({
      halfCheckedKeys,
      checkedKeys
    })
  }

  updateExpanded(expandedKeys) {
    this.setState({
      expandedKeys
    })
  }

  render() {
    const { treeNodes } = this.state;
    return (
      <div>
          {treeNodes.map((item, index) => this.renderTreeNode(item, index+""))}
      </div>
    )
  }
}

Tree.TreeNode = TreeNode;

export default Tree;