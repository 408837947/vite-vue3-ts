<!--
 * @Author: Jelly
 * @Date: 2022-08-31 09:50:42
 * @LastEditTime: 2022-09-28 14:09:29
 * @LastEditors: Jelly
 * @Description: 营销计划编辑器
-->
<template>
  <div class="g6-graph">
    <!-- 顶部展示 -->
    <div class="header">
      <div style="line-height: 55px" v-text="title"></div>
      <div style="margin-top: 10px">
        <el-button @click="saveClick" type="primary">保存</el-button>
      </div>
    </div>
    <div class="container">
      <!-- 左侧操作栏 -->
      <ItemPanel :disabled="disabled" />
      <!-- 画布 -->
      <div id="graph"></div>
    </div>
  </div>
  <GiftDialog ref="giftDialog" @dialogSave="dialogSave" />
  <GroupDialog ref="groupDialog" @dialogSave="dialogSave" />
  <EventDIalog ref="eventDialog" @dialogSave="dialogSave" />
</template>

<script setup>
import { Grid, Graph, Arrow, registerNode, registerBehavior, registerEdge } from '@antv/g6'
import ItemPanel from './components/itemPanel.vue'
import DragAnchor from './components/drag-anchor'
import { data } from './components/data'
import { getImageUrl } from '@/utils'
import { nextTick, onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import GroupDialog from './components/groupDialog.vue'
import GiftDialog from './components/giftDialog.vue'
import EventDIalog from './components/eventDIalog.vue'

const route = useRoute()
const anchorPointMap = [
  [0.0, 0.5],
  [0.5, 0.0],
  [1.0, 0.5],
  [0.5, 1.0],
]
let dragNodeShouldBegin = true
const groupDialog = ref()
const giftDialog = ref()
const eventDialog = ref()
let graph
let title = ref('营销计划')
let disabled = ref(false)
let formateDialog = reactive({
  201: giftDialog, // 发放奖励弹窗
  101: groupDialog, // 群组判断弹窗
  102: eventDialog, // 事件判断弹窗
})

onMounted(() => {
  nextTick(() => {
    createGraphic()
    if (route.query.sendStatus != 1) {
      disabled.value = true
    }
  })
})
onBeforeUnmount(() => {
  graph.destroy()
})
// 画布初始化
const createGraphic = () => {
  // 注册各种自定义内容
  DragAnchor(registerBehavior)
  const grid = new Grid()
  const newGraph = new Graph({
    container: document.getElementById('graph'),
    width: window.innerWidth - 402,
    height: window.innerHeight - 57,
    defaultNode: {
      type: 'circle',
      size: [150, 60],
      anchorPoints: anchorPointMap,
      // 样式
      style: {
        radius: 5,
        lineWidth: 2,
        fill: '#b2bec7',
        stroke: '#b2bec7',
        cursor: 'move', // 鼠标移动到节点的样式
      },
      // 节点文字样式
      labelCfg: {
        style: {
          fontSize: 14,
          fill: '#fff',
          cursor: 'pointer', // 鼠标移到文字样式
        },
      },
    },
    defaultEdge: {
      type: 'polyline',
      style: {
        endArrow: {
          // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
          path: Arrow.triangle(5, 5, 1),
          opacity: 0.8,
          // ...
        },
        lineWidth: 1,
        lineAppendWidth: 10,
      },
    },
    modes: {
      default: [
        'drag-anchor',
        'brush-select',
        {
          type: 'drag-node',
          shouldBegin() {
            if (disabled.value) {
              return false
            }
            return dragNodeShouldBegin
          },
        },
      ],
      edit: ['click-select'],
    },
    plugins: [grid],
  })
  graph = newGraph
  bindEvents()
  customNode()
  customEdge()
  setTimeout(() => {
    graph.changeData(data)
  }, 10)
}
// 画布事件
const bindEvents = () => {
  // 画布监听鼠标释放时间，添加节点
  graph.on('drop', (e) => {
    if (e.originalEvent.dataTransfer) {
      const { item } = JSON.parse(e.originalEvent.dataTransfer.getData('item'))
      let obj = {
        type: 'icon-node',
        label: item.label,
        text: item.labelReadme || '请选择',
        leftIcon: {
          style: {
            r: 40,
            fill: item.imgColor,
            stroke: item.imgColor,
          },
          img: item.icon,
        },
        size: [150, 60],
        x: e.x,
        y: e.y,
        componentType: item.componentType,
        style: {
          fill: item.backgroundColor,
          stroke: item.backgroundColor,
        },
        labelCfg: {
          style: {
            fill: item.color,
          },
        },
      }
      // 拖拽操作栏，新增节点
      graph.addItem('node', obj)
    }
  })
  graph.on('before-anchor-dragstart', () => {
    // 禁用节点拖拽行为
    dragNodeShouldBegin = false
  })
  graph.on('after-anchor-dragend', () => {
    // 启用节点拖拽行为
    dragNodeShouldBegin = true
  })
  // 在锚点上释放鼠标
  graph.on('after-anchor-drop', ({ label, source, sourceAnchor, target, targetAnchor }) => {
    // 发生连线
    if (source && !disabled.value) {
      let color = sourceAnchor == 0 ? '#00CC33 ' : sourceAnchor == 2 ? '#ff0000' : '#c6c6c6'
      // 添加连线
      graph.addItem('edge', {
        type: 'icon-edge',
        fill: '#333',
        label,
        source,
        sourceAnchor,
        target,
        targetAnchor,
        style: {
          stroke: color,
          endArrow: {
            fill: color,
            stroke: color,
          },
        },
      })
    }

    // 恢复节点拖拽行为
    dragNodeShouldBegin = true
  })
  graph.on('node:click', (evt) => {
    eventItem(evt)
  })
  graph.on('edge:click', (evt) => {
    eventItem(evt)
  })
  graph.on('node:mouseenter', (evt) => {
    const node = evt.item
    graph.setItemState(node, 'hover', !node.hasState('hover')) // 切换选中
  })
  graph.on('node:mouseleave', (evt) => {
    const node = evt.item
    graph.setItemState(node, 'hover', !node.hasState('hover')) // 切换选中
  })
  graph.on('edge:mouseenter', (evt) => {
    const node = evt.item
    graph.setItemState(node, 'hover', !node.hasState('hover')) // 切换选中
  })
  graph.on('edge:mouseleave', (evt) => {
    const node = evt.item
    graph.setItemState(node, 'hover', !node.hasState('hover')) // 切换选中
  })
}
// 自定义节点
const customNode = () => {
  registerNode(
    'icon-node',
    {
      draw(cfg, group) {
        const styles = this.getShapeStyle(cfg)
        const { labelCfg = {} } = cfg

        const w = styles.width
        const h = styles.height

        const keyShape = group.addShape('rect', {
          attrs: {
            ...styles,
            x: -w / 2,
            y: -h / 2,
          },
        })

        /**
         * leftIcon 格式如下：
         *  {
         *    style: ShapeStyle;
         *    img: ''
         *  }
         */
        if (cfg.leftIcon) {
          const { style, img } = cfg.leftIcon
          group.addShape('rect', {
            // 节点左侧图标背景色
            attrs: {
              x: 5 - w / 2,
              y: 1 - h / 2,
              width: 60,
              height: h - 2,
              fill: style.imgColor,
              ...style,
            },
          })
          // 节点左侧icon的样式
          group.addShape('image', {
            attrs: {
              x: 25 - w / 2,
              y: 18 - h / 2,
              width: 24,
              height: 24,
              img: img,
              cursor: 'pointer',
            },
            name: 'image-shape',
          })
        }
        if (cfg.label !== '开始') {
          // 结束右上角删除节点
          group.addShape('image', {
            attrs: {
              x: w / 2 - 10,
              y: h / 2 - 68,
              width: 20,
              height: 20,
              cursor: 'pointer',
              img: getImageUrl('png/close.png'),
              opacity: 0,
            },
            name: 'remove-item',
          })
          if (cfg.label !== '结束') {
            // 上下左右锚点绘制
            for (let i = 0; i < 3; i++) {
              const x = w * (anchorPointMap[i][0] - 0.5)
              const y = h * (anchorPointMap[i][1] - 0.5)

              // 锚点
              group.addShape('circle', {
                attrs: {
                  r: 5,
                  cursor: 'pointer',
                  stroke: '#333',
                  fill: '#fff',
                  x,
                  y,
                  opacity: 0,
                },
                anchorIndex: i,
                draggable: true,
                name: 'anchor',
              })
            }
            if (cfg.label && cfg.text) {
              // 文字节点
              group.addShape('text', {
                attrs: {
                  ...labelCfg.style,
                  fill: '#333',
                  text: cfg.label,
                  x: 70 - w / 2,
                  y: 25 - h / 2,
                },
              })
              // 文字说明节点
              group.addShape('text', {
                attrs: {
                  ...labelCfg.style,
                  fill: '#999',
                  fontSize: 12,
                  text: cfg.text,
                  x: 70 - w / 2,
                  y: h / 2 - 10,
                },
              })
            }
          } else {
            // 结束节点的上锚点
            group.addShape('circle', {
              attrs: {
                r: 5,
                cursor: 'pointer',
                stroke: '#333',
                fill: '#fff',
                x: 0,
                y: h * -0.5,
                opacity: 0,
              },
              anchorIndex: 1,
              draggable: true,
              name: 'anchor',
            })
            // 结束的文字节点
            if (cfg.label) {
              group.addShape('text', {
                attrs: {
                  ...labelCfg.style,
                  fill: '#333',
                  text: cfg.label,
                  x: 90 - w / 2,
                  y: 38 - h / 2,
                },
              })
            }
          }
        } else {
          // 开始节点的下锚点
          group.addShape('circle', {
            attrs: {
              r: 5,
              cursor: 'pointer',
              stroke: '#333',
              fill: '#fff',
              x: 0,
              y: h * 0.5,
              opacity: 0,
            },
            anchorIndex: 3,
            draggable: true,
            name: 'anchor',
          })
          // 开始节点的文字节点
          if (cfg.label) {
            group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: cfg.label,
                x: 90 - w / 2,
                y: 38 - h / 2,
              },
            })
          }
        }
        return keyShape
      },
      setState(name, value, item) {
        if (disabled.value) {
          return null
        }
        let group = item.getContainer()
        if (name === 'hover') {
          let shape = group.get('children').filter((ele) => {
            return ['anchor', 'remove-item'].includes(ele.cfg.name)
          })
          shape.map((anchor) => {
            if (value) {
              anchor.attr('opacity', 1)
            } else {
              anchor.attr('opacity', 0)
            }
          })
        }
      },
      update: undefined,
    },
    'rect'
  )
}
// 自定义边
const customEdge = () => {
  registerEdge(
    'icon-edge',
    {
      afterDraw(cfg, group) {
        // 获取图形组中的第一个图形，在这里就是边的路径图形
        const shape = group.get('children')[0]
        // 获取路径图形的中点坐标
        const midPoint = shape.getPoint(0.3)
        // 在中点增加一个矩形，注意矩形的原点在其左上角
        group.addShape('image', {
          attrs: {
            width: 20,
            height: 20,
            x: midPoint.x - 10,
            y: midPoint.y - 10,
            cursor: 'pointer',
            img: getImageUrl('png/close.png'),
            opacity: 0,
          },
          name: 'remove-item',
        })
      },
      setState(name, value, item) {
        if (disabled.value) {
          return null
        }
        let group = item.getContainer()
        if (name === 'hover') {
          let shape = group.get('children').filter((ele) => {
            return ['anchor', 'remove-item'].includes(ele.cfg.name)
          })
          shape.map((anchor) => {
            if (value) {
              anchor.attr('opacity', 1)
            } else {
              anchor.attr('opacity', 0)
            }
          })
        }
      },
      update: undefined,
    },
    'polyline'
  )
}
// 节点点击行为
const eventItem = (evt) => {
  const { item, target } = evt
  const targetType = target.get('type')
  const name = target.get('name')
  const model = item.getModel()
  if (['image', 'text'].includes(targetType)) {
    if (name === 'remove-item') {
      graph.removeItem(model.id)
    } else if (model.componentType && (name === 'image-shape' || targetType === 'text')) {
      formateDialog[model.componentType].handleEcho(item, model)
    }
  }
}
// 保存
const saveClick = () => {
  console.log(graph.save())
}
// 弹窗保存后处理
const dialogSave = (argus) => {
  argus[1].text = argus[2]
  argus[1][argus[4]] = argus[3]
  argus[0].update(argus[1])
}
</script>
<style lang="scss" scoped>
.g6-graph {
  height: 100%;
  border: 1px solid #333;

  .header {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    padding: 0px 100px;
    box-sizing: border-box;
    border-bottom: 1px solid #333;
  }

  .container {
    display: flex;
    justify-self: flex-start;
    height: calc(100% - 55px);
  }
}
</style>
